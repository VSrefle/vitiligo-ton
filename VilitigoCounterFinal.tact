import "@stdlib/deploy";
import "@stdlib/ownable";

// ── STRUCTS ──

struct UserData {
    wallet: Address;
    name: String;
    country: String;
    city: String;
    age: Int as uint8;
    hasConstellation: Bool;
    constName: String;
    isRare: Bool;
    isLegendary: Bool;
    discoveryNumber: Int as uint8;
    story: String;
    pixelColor: String;
    mintedAt: Int as uint32;
}

struct CityCount {
    city: String;
    count: Int as uint32;
}

// ── MESSAGES ──

message Register {
    queryId: Int as uint64;
    name: String;
    country: String;
    city: String;
    age: Int as uint8;
}

message MintConstellation {
    queryId: Int as uint64;
    constName: String;
    isRare: Bool;
    isLegendary: Bool;
    discoveryNumber: Int as uint8;
    story: String;
    pixelColor: String;
}

message AdminWithdraw {
    queryId: Int as uint64;
    amount: Int as coins;
}

// ── CONTRACT ──

contract VilitigoCounter with Deployable, Ownable {
    owner: Address;

    // Core counters
    totalCount: Int as uint32 = 0;
    photoCount: Int as uint32 = 0;

    // Real IAU constellations tracker (88 bits packed into Int)
    // bit N = 1 means constellation #N has been discovered
    realConstellationsMap: Int as uint256 = 0;
    realConstellationsFound: Int as uint8 = 0;

    // Users map
    users: map<Address, UserData>;

    // City counts map (for map page)
    cityCounts: map<Int, CityCount>;
    cityCountsSize: Int as uint32 = 0;

    init(owner: Address) {
        self.owner = owner;
    }

    // ── REGISTER ──
    receive(msg: Register) {
        let sender: Address = sender();
        require(self.users.get(sender) == null, "Already registered");
        require(context().value >= ton("1"), "Send at least 1 TON");

        self.users.set(sender, UserData{
            wallet: sender,
            name: msg.name,
            country: msg.country,
            city: msg.city,
            age: msg.age,
            hasConstellation: false,
            constName: "",
            isRare: false,
            isLegendary: false,
            discoveryNumber: 0,
            story: "",
            pixelColor: "#9333ea",
            mintedAt: 0
        });

        self.totalCount = self.totalCount + 1;

        // Track city count
        self.trackCity(msg.city);

        // Return excess gas
        let excess: Int = context().value - ton("1");
        if (excess > ton("0.01")) {
            send(SendParameters{
                to: sender,
                value: excess - ton("0.01"),
                mode: SendIgnoreErrors,
                bounce: false,
                body: "Excess gas".asComment()
            });
        }
    }

    // ── MINT CONSTELLATION ──
    receive(msg: MintConstellation) {
        let sender: Address = sender();
        let user: UserData? = self.users.get(sender);
        require(user != null, "Register first");
        require(context().value >= ton("1"), "Send at least 1 TON");

        let u: UserData = user!!;

        // Star only upgrades, never degrades: normal < rare < legendary
        // Money always stays — this is a lottery, rules are known upfront
        // Only update if new level is higher than current

        let shouldUpgrade: Bool = false;
        if (msg.isLegendary && !u.isLegendary) {
            shouldUpgrade = true;
        } else if (msg.isRare && !u.isRare && !u.isLegendary) {
            shouldUpgrade = true;
        } else if (!u.hasConstellation) {
            shouldUpgrade = true;
        }

        // Always increment photoCount — tracks total mints including upgrades
        self.photoCount = self.photoCount + 1;

        if (shouldUpgrade) {
            // Mark legendary constellation as discovered
            if (msg.isLegendary && msg.discoveryNumber > 0 && msg.discoveryNumber <= 88) {
                let bit: Int = 1 << (msg.discoveryNumber - 1);
                if ((self.realConstellationsMap & bit) == 0) {
                    self.realConstellationsMap = self.realConstellationsMap | bit;
                    self.realConstellationsFound = self.realConstellationsFound + 1;
                }
            }
            u.hasConstellation = true;
            u.constName = msg.constName;
            u.isRare = msg.isRare || u.isRare;
            u.isLegendary = msg.isLegendary;
            u.discoveryNumber = msg.discoveryNumber;
            u.pixelColor = msg.pixelColor;
        }

        // Always update story — even without visual upgrade
        u.story = msg.story;
        u.mintedAt = now();
        self.users.set(sender, u);

        // Return only excess gas above 1 TON
        let excess: Int = context().value - ton("1");
        if (excess > ton("0.01")) {
            send(SendParameters{
                to: sender,
                value: excess - ton("0.01"),
                mode: SendIgnoreErrors,
                bounce: false,
                body: "Excess gas".asComment()
            });
        }
    }

    // ── ADMIN WITHDRAW ──
    receive(msg: AdminWithdraw) {
        self.requireOwner();
        require(msg.amount <= myBalance() - ton("0.1"), "Keep 0.1 TON for fees");
        send(SendParameters{
            to: self.owner,
            value: msg.amount,
            mode: SendIgnoreErrors,
            bounce: false,
            body: "Withdrawal".asComment()
        });
    }

    // ── INTERNAL: TRACK CITY ──
    fun trackCity(city: String) {
        if (city == "") { return; }
        // Find existing city or add new
        let i: Int = 0;
        while (i < self.cityCountsSize) {
            let entry: CityCount? = self.cityCounts.get(i);
            if (entry != null && (entry!!).city == city) {
                let updated: CityCount = CityCount{
                    city: city,
                    count: (entry!!).count + 1
                };
                self.cityCounts.set(i, updated);
                return;
            }
            i = i + 1;
        }
        // New city
        self.cityCounts.set(self.cityCountsSize, CityCount{city: city, count: 1});
        self.cityCountsSize = self.cityCountsSize + 1;
    }

    // ── GETTERS ──

    get fun totalCount(): Int {
        return self.totalCount;
    }

    get fun photoCount(): Int {
        return self.photoCount;
    }

    get fun getUser(wallet: Address): UserData? {
        return self.users.get(wallet);
    }

    get fun isRegistered(wallet: Address): Bool {
        return self.users.get(wallet) != null;
    }

    get fun hasConstellation(wallet: Address): Bool {
        let u: UserData? = self.users.get(wallet);
        if (u == null) { return false; }
        return (u!!).hasConstellation;
    }

    get fun realConstellationsFound(): Int {
        return self.realConstellationsFound;
    }

    get fun realConstellationsMap(): Int {
        return self.realConstellationsMap;
    }

    get fun isConstellationDiscovered(number: Int): Bool {
        require(number >= 1 && number <= 88, "Invalid constellation number");
        let bit: Int = 1 << (number - 1);
        return (self.realConstellationsMap & bit) != 0;
    }

    get fun getCityCount(index: Int): CityCount? {
        return self.cityCounts.get(index);
    }

    get fun cityCountsSize(): Int {
        return self.cityCountsSize;
    }

    get fun starLevel(wallet: Address): Int {
        let u: UserData? = self.users.get(wallet);
        if (u == null) { return 0; }
        if ((u!!).isLegendary) { return 3; }
        if ((u!!).isRare) { return 2; }
        if ((u!!).hasConstellation) { return 1; }
        return 0;
    }

    get fun balance(): Int {
        return myBalance();
    }
}
