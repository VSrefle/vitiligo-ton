import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    ComputeError,
    TupleItem,
    TupleReader,
    Dictionary,
    contractAddress,
    address,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

export function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

export function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

export function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

export function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

export function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type UserData = {
    $$type: 'UserData';
    wallet: Address;
    name: string;
    country: string;
    city: string;
    age: bigint;
    hasConstellation: boolean;
    constName: string;
    isRare: boolean;
    isLegendary: boolean;
    discoveryNumber: bigint;
    story: string;
    pixelColor: string;
    mintedAt: bigint;
}

export function storeUserData(src: UserData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.wallet);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.country);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.city);
        b_1.storeUint(src.age, 8);
        b_1.storeBit(src.hasConstellation);
        b_1.storeStringRefTail(src.constName);
        b_1.storeBit(src.isRare);
        b_1.storeBit(src.isLegendary);
        b_1.storeUint(src.discoveryNumber, 8);
        b_1.storeStringRefTail(src.story);
        b_1.storeStringRefTail(src.pixelColor);
        b_1.storeUint(src.mintedAt, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUserData(slice: Slice) {
    const sc_0 = slice;
    const _wallet = sc_0.loadAddress();
    const _name = sc_0.loadStringRefTail();
    const _country = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _city = sc_1.loadStringRefTail();
    const _age = sc_1.loadUintBig(8);
    const _hasConstellation = sc_1.loadBit();
    const _constName = sc_1.loadStringRefTail();
    const _isRare = sc_1.loadBit();
    const _isLegendary = sc_1.loadBit();
    const _discoveryNumber = sc_1.loadUintBig(8);
    const _story = sc_1.loadStringRefTail();
    const _pixelColor = sc_1.loadStringRefTail();
    const _mintedAt = sc_1.loadUintBig(32);
    return { $$type: 'UserData' as const, wallet: _wallet, name: _name, country: _country, city: _city, age: _age, hasConstellation: _hasConstellation, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor, mintedAt: _mintedAt };
}

export function loadTupleUserData(source: TupleReader) {
    const _wallet = source.readAddress();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    const _hasConstellation = source.readBoolean();
    const _constName = source.readString();
    const _isRare = source.readBoolean();
    const _isLegendary = source.readBoolean();
    const _discoveryNumber = source.readBigNumber();
    const _story = source.readString();
    const _pixelColor = source.readString();
    const _mintedAt = source.readBigNumber();
    return { $$type: 'UserData' as const, wallet: _wallet, name: _name, country: _country, city: _city, age: _age, hasConstellation: _hasConstellation, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor, mintedAt: _mintedAt };
}

export function loadGetterTupleUserData(source: TupleReader) {
    const _wallet = source.readAddress();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    const _hasConstellation = source.readBoolean();
    const _constName = source.readString();
    const _isRare = source.readBoolean();
    const _isLegendary = source.readBoolean();
    const _discoveryNumber = source.readBigNumber();
    const _story = source.readString();
    const _pixelColor = source.readString();
    const _mintedAt = source.readBigNumber();
    return { $$type: 'UserData' as const, wallet: _wallet, name: _name, country: _country, city: _city, age: _age, hasConstellation: _hasConstellation, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor, mintedAt: _mintedAt };
}

export function storeTupleUserData(source: UserData) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeString(source.name);
    builder.writeString(source.country);
    builder.writeString(source.city);
    builder.writeNumber(source.age);
    builder.writeBoolean(source.hasConstellation);
    builder.writeString(source.constName);
    builder.writeBoolean(source.isRare);
    builder.writeBoolean(source.isLegendary);
    builder.writeNumber(source.discoveryNumber);
    builder.writeString(source.story);
    builder.writeString(source.pixelColor);
    builder.writeNumber(source.mintedAt);
    return builder.build();
}

export function dictValueParserUserData(): DictionaryValue<UserData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserData(src)).endCell());
        },
        parse: (src) => {
            return loadUserData(src.loadRef().beginParse());
        }
    }
}

export type CityCount = {
    $$type: 'CityCount';
    city: string;
    count: bigint;
}

export function storeCityCount(src: CityCount) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeStringRefTail(src.city);
        b_0.storeUint(src.count, 32);
    };
}

export function loadCityCount(slice: Slice) {
    const sc_0 = slice;
    const _city = sc_0.loadStringRefTail();
    const _count = sc_0.loadUintBig(32);
    return { $$type: 'CityCount' as const, city: _city, count: _count };
}

export function loadTupleCityCount(source: TupleReader) {
    const _city = source.readString();
    const _count = source.readBigNumber();
    return { $$type: 'CityCount' as const, city: _city, count: _count };
}

export function loadGetterTupleCityCount(source: TupleReader) {
    const _city = source.readString();
    const _count = source.readBigNumber();
    return { $$type: 'CityCount' as const, city: _city, count: _count };
}

export function storeTupleCityCount(source: CityCount) {
    const builder = new TupleBuilder();
    builder.writeString(source.city);
    builder.writeNumber(source.count);
    return builder.build();
}

export function dictValueParserCityCount(): DictionaryValue<CityCount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCityCount(src)).endCell());
        },
        parse: (src) => {
            return loadCityCount(src.loadRef().beginParse());
        }
    }
}

export type Register = {
    $$type: 'Register';
    queryId: bigint;
    name: string;
    country: string;
    city: string;
    age: bigint;
}

export function storeRegister(src: Register) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4169119751, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.country);
        b_0.storeStringRefTail(src.city);
        b_0.storeUint(src.age, 8);
    };
}

export function loadRegister(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4169119751) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _name = sc_0.loadStringRefTail();
    const _country = sc_0.loadStringRefTail();
    const _city = sc_0.loadStringRefTail();
    const _age = sc_0.loadUintBig(8);
    return { $$type: 'Register' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age };
}

export function loadTupleRegister(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    return { $$type: 'Register' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age };
}

export function loadGetterTupleRegister(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    return { $$type: 'Register' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age };
}

export function storeTupleRegister(source: Register) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.name);
    builder.writeString(source.country);
    builder.writeString(source.city);
    builder.writeNumber(source.age);
    return builder.build();
}

export function dictValueParserRegister(): DictionaryValue<Register> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRegister(src)).endCell());
        },
        parse: (src) => {
            return loadRegister(src.loadRef().beginParse());
        }
    }
}

export type MintConstellation = {
    $$type: 'MintConstellation';
    queryId: bigint;
    constName: string;
    isRare: boolean;
    isLegendary: boolean;
    discoveryNumber: bigint;
    story: string;
    pixelColor: string;
}

export function storeMintConstellation(src: MintConstellation) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2966455759, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.constName);
        b_0.storeBit(src.isRare);
        b_0.storeBit(src.isLegendary);
        b_0.storeUint(src.discoveryNumber, 8);
        b_0.storeStringRefTail(src.story);
        b_0.storeStringRefTail(src.pixelColor);
    };
}

export function loadMintConstellation(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2966455759) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _constName = sc_0.loadStringRefTail();
    const _isRare = sc_0.loadBit();
    const _isLegendary = sc_0.loadBit();
    const _discoveryNumber = sc_0.loadUintBig(8);
    const _story = sc_0.loadStringRefTail();
    const _pixelColor = sc_0.loadStringRefTail();
    return { $$type: 'MintConstellation' as const, queryId: _queryId, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor };
}

export function loadTupleMintConstellation(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _constName = source.readString();
    const _isRare = source.readBoolean();
    const _isLegendary = source.readBoolean();
    const _discoveryNumber = source.readBigNumber();
    const _story = source.readString();
    const _pixelColor = source.readString();
    return { $$type: 'MintConstellation' as const, queryId: _queryId, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor };
}

export function loadGetterTupleMintConstellation(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _constName = source.readString();
    const _isRare = source.readBoolean();
    const _isLegendary = source.readBoolean();
    const _discoveryNumber = source.readBigNumber();
    const _story = source.readString();
    const _pixelColor = source.readString();
    return { $$type: 'MintConstellation' as const, queryId: _queryId, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor };
}

export function storeTupleMintConstellation(source: MintConstellation) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.constName);
    builder.writeBoolean(source.isRare);
    builder.writeBoolean(source.isLegendary);
    builder.writeNumber(source.discoveryNumber);
    builder.writeString(source.story);
    builder.writeString(source.pixelColor);
    return builder.build();
}

export function dictValueParserMintConstellation(): DictionaryValue<MintConstellation> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintConstellation(src)).endCell());
        },
        parse: (src) => {
            return loadMintConstellation(src.loadRef().beginParse());
        }
    }
}

export type JoinAndMint = {
    $$type: 'JoinAndMint';
    queryId: bigint;
    name: string;
    country: string;
    city: string;
    age: bigint;
    constName: string;
    isRare: boolean;
    isLegendary: boolean;
    discoveryNumber: bigint;
    story: string;
    pixelColor: string;
}

export function storeJoinAndMint(src: JoinAndMint) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2274933188, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.country);
        const b_1 = new Builder();
        b_1.storeStringRefTail(src.city);
        b_1.storeUint(src.age, 8);
        b_1.storeStringRefTail(src.constName);
        b_1.storeBit(src.isRare);
        b_1.storeBit(src.isLegendary);
        b_1.storeUint(src.discoveryNumber, 8);
        b_1.storeStringRefTail(src.story);
        b_1.storeStringRefTail(src.pixelColor);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadJoinAndMint(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2274933188) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _name = sc_0.loadStringRefTail();
    const _country = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _city = sc_1.loadStringRefTail();
    const _age = sc_1.loadUintBig(8);
    const _constName = sc_1.loadStringRefTail();
    const _isRare = sc_1.loadBit();
    const _isLegendary = sc_1.loadBit();
    const _discoveryNumber = sc_1.loadUintBig(8);
    const _story = sc_1.loadStringRefTail();
    const _pixelColor = sc_1.loadStringRefTail();
    return { $$type: 'JoinAndMint' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor };
}

export function loadTupleJoinAndMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    const _constName = source.readString();
    const _isRare = source.readBoolean();
    const _isLegendary = source.readBoolean();
    const _discoveryNumber = source.readBigNumber();
    const _story = source.readString();
    const _pixelColor = source.readString();
    return { $$type: 'JoinAndMint' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor };
}

export function loadGetterTupleJoinAndMint(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    const _constName = source.readString();
    const _isRare = source.readBoolean();
    const _isLegendary = source.readBoolean();
    const _discoveryNumber = source.readBigNumber();
    const _story = source.readString();
    const _pixelColor = source.readString();
    return { $$type: 'JoinAndMint' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age, constName: _constName, isRare: _isRare, isLegendary: _isLegendary, discoveryNumber: _discoveryNumber, story: _story, pixelColor: _pixelColor };
}

export function storeTupleJoinAndMint(source: JoinAndMint) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.name);
    builder.writeString(source.country);
    builder.writeString(source.city);
    builder.writeNumber(source.age);
    builder.writeString(source.constName);
    builder.writeBoolean(source.isRare);
    builder.writeBoolean(source.isLegendary);
    builder.writeNumber(source.discoveryNumber);
    builder.writeString(source.story);
    builder.writeString(source.pixelColor);
    return builder.build();
}

export function dictValueParserJoinAndMint(): DictionaryValue<JoinAndMint> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJoinAndMint(src)).endCell());
        },
        parse: (src) => {
            return loadJoinAndMint(src.loadRef().beginParse());
        }
    }
}

export type UpdateProfile = {
    $$type: 'UpdateProfile';
    queryId: bigint;
    name: string;
    country: string;
    city: string;
    age: bigint;
}

export function storeUpdateProfile(src: UpdateProfile) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(170647584, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeStringRefTail(src.name);
        b_0.storeStringRefTail(src.country);
        b_0.storeStringRefTail(src.city);
        b_0.storeUint(src.age, 8);
    };
}

export function loadUpdateProfile(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 170647584) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _name = sc_0.loadStringRefTail();
    const _country = sc_0.loadStringRefTail();
    const _city = sc_0.loadStringRefTail();
    const _age = sc_0.loadUintBig(8);
    return { $$type: 'UpdateProfile' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age };
}

export function loadTupleUpdateProfile(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    return { $$type: 'UpdateProfile' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age };
}

export function loadGetterTupleUpdateProfile(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _name = source.readString();
    const _country = source.readString();
    const _city = source.readString();
    const _age = source.readBigNumber();
    return { $$type: 'UpdateProfile' as const, queryId: _queryId, name: _name, country: _country, city: _city, age: _age };
}

export function storeTupleUpdateProfile(source: UpdateProfile) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeString(source.name);
    builder.writeString(source.country);
    builder.writeString(source.city);
    builder.writeNumber(source.age);
    return builder.build();
}

export function dictValueParserUpdateProfile(): DictionaryValue<UpdateProfile> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateProfile(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateProfile(src.loadRef().beginParse());
        }
    }
}

export type AdminWithdraw = {
    $$type: 'AdminWithdraw';
    queryId: bigint;
    amount: bigint;
}

export function storeAdminWithdraw(src: AdminWithdraw) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1626189421, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadAdminWithdraw(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1626189421) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    return { $$type: 'AdminWithdraw' as const, queryId: _queryId, amount: _amount };
}

export function loadTupleAdminWithdraw(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'AdminWithdraw' as const, queryId: _queryId, amount: _amount };
}

export function loadGetterTupleAdminWithdraw(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _amount = source.readBigNumber();
    return { $$type: 'AdminWithdraw' as const, queryId: _queryId, amount: _amount };
}

export function storeTupleAdminWithdraw(source: AdminWithdraw) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserAdminWithdraw(): DictionaryValue<AdminWithdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAdminWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadAdminWithdraw(src.loadRef().beginParse());
        }
    }
}

export type VilitigoCounter$Data = {
    $$type: 'VilitigoCounter$Data';
    owner: Address;
    totalCount: bigint;
    photoCount: bigint;
    realConstellationsMap: bigint;
    realConstellationsFound: bigint;
    users: Dictionary<Address, UserData>;
    cityCounts: Dictionary<bigint, CityCount>;
    cityCountsSize: bigint;
}

export function storeVilitigoCounter$Data(src: VilitigoCounter$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeUint(src.totalCount, 32);
        b_0.storeUint(src.photoCount, 32);
        b_0.storeUint(src.realConstellationsMap, 256);
        b_0.storeUint(src.realConstellationsFound, 8);
        b_0.storeDict(src.users, Dictionary.Keys.Address(), dictValueParserUserData());
        b_0.storeDict(src.cityCounts, Dictionary.Keys.BigInt(257), dictValueParserCityCount());
        b_0.storeUint(src.cityCountsSize, 32);
    };
}

export function loadVilitigoCounter$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _totalCount = sc_0.loadUintBig(32);
    const _photoCount = sc_0.loadUintBig(32);
    const _realConstellationsMap = sc_0.loadUintBig(256);
    const _realConstellationsFound = sc_0.loadUintBig(8);
    const _users = Dictionary.load(Dictionary.Keys.Address(), dictValueParserUserData(), sc_0);
    const _cityCounts = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserCityCount(), sc_0);
    const _cityCountsSize = sc_0.loadUintBig(32);
    return { $$type: 'VilitigoCounter$Data' as const, owner: _owner, totalCount: _totalCount, photoCount: _photoCount, realConstellationsMap: _realConstellationsMap, realConstellationsFound: _realConstellationsFound, users: _users, cityCounts: _cityCounts, cityCountsSize: _cityCountsSize };
}

export function loadTupleVilitigoCounter$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _totalCount = source.readBigNumber();
    const _photoCount = source.readBigNumber();
    const _realConstellationsMap = source.readBigNumber();
    const _realConstellationsFound = source.readBigNumber();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserData(), source.readCellOpt());
    const _cityCounts = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserCityCount(), source.readCellOpt());
    const _cityCountsSize = source.readBigNumber();
    return { $$type: 'VilitigoCounter$Data' as const, owner: _owner, totalCount: _totalCount, photoCount: _photoCount, realConstellationsMap: _realConstellationsMap, realConstellationsFound: _realConstellationsFound, users: _users, cityCounts: _cityCounts, cityCountsSize: _cityCountsSize };
}

export function loadGetterTupleVilitigoCounter$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _totalCount = source.readBigNumber();
    const _photoCount = source.readBigNumber();
    const _realConstellationsMap = source.readBigNumber();
    const _realConstellationsFound = source.readBigNumber();
    const _users = Dictionary.loadDirect(Dictionary.Keys.Address(), dictValueParserUserData(), source.readCellOpt());
    const _cityCounts = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserCityCount(), source.readCellOpt());
    const _cityCountsSize = source.readBigNumber();
    return { $$type: 'VilitigoCounter$Data' as const, owner: _owner, totalCount: _totalCount, photoCount: _photoCount, realConstellationsMap: _realConstellationsMap, realConstellationsFound: _realConstellationsFound, users: _users, cityCounts: _cityCounts, cityCountsSize: _cityCountsSize };
}

export function storeTupleVilitigoCounter$Data(source: VilitigoCounter$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.totalCount);
    builder.writeNumber(source.photoCount);
    builder.writeNumber(source.realConstellationsMap);
    builder.writeNumber(source.realConstellationsFound);
    builder.writeCell(source.users.size > 0 ? beginCell().storeDictDirect(source.users, Dictionary.Keys.Address(), dictValueParserUserData()).endCell() : null);
    builder.writeCell(source.cityCounts.size > 0 ? beginCell().storeDictDirect(source.cityCounts, Dictionary.Keys.BigInt(257), dictValueParserCityCount()).endCell() : null);
    builder.writeNumber(source.cityCountsSize);
    return builder.build();
}

export function dictValueParserVilitigoCounter$Data(): DictionaryValue<VilitigoCounter$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVilitigoCounter$Data(src)).endCell());
        },
        parse: (src) => {
            return loadVilitigoCounter$Data(src.loadRef().beginParse());
        }
    }
}

 type VilitigoCounter_init_args = {
    $$type: 'VilitigoCounter_init_args';
    owner: Address;
}

function initVilitigoCounter_init_args(src: VilitigoCounter_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function VilitigoCounter_init(owner: Address) {
    const __code = Cell.fromHex('b5ee9c7241024201000d5900022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d901270202710213020120030e020120040902016a05070160a802ed44d0d200018e14fa40d31fd31fd3ffd307f404f404d31f55706c189cfa400101d1705470006d6d22e2db3c6c81060002200190ab03ed44d0d200018e14fa40d31fd31fd3ffd307f404f404d31f55706c189cfa400101d1705470006d6d22e25507db3c6c81206e92306d99206ef2d0806f226f02e2206e92306dde080042810101230259f40d6fa192306ddf206e92306d9cd0d401d001d31f596c126f02e20201580a0c0165af5376a268690000c70a7d20698fe98fe9ffe983fa027a02698faab8360c4e7d200080e8b82a380036b691712a83ed9e3640c00b015c81010b240259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de2206e923070e0206ef2d0806f2d107c5f0c350161aca1f6a268690000c70a7d20698fe98fe9ffe983fa027a02698faab8360c4e7d200080e8b82a380036b691716d9e3640c00d0002230201620f110161ae8ef6a268690000c70a7d20698fe98fe9ffe983fa027a02698faab8360c4e7d200080e8b82a380036b691716d9e3640c0100002270161ad6df6a268690000c70a7d20698fe98fe9ffe983fa027a02698faab8360c4e7d200080e8b82a380036b691716d9e3640c012000224020120141f020120151a02015816180161af6076a268690000c70a7d20698fe98fe9ffe983fa027a02698faab8360c4e7d200080e8b82a380036b691716d9e3640c0170008f8276f100165ac9976a268690000c70a7d20698fe98fe9ffe983fa027a02698faab8360c4e7d200080e8b82a380036b691712a83ed9e3640c019013e81010b240259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de26eb3350201201b1d0161b15b3b513434800063853e9034c7f4c7f4fff4c1fd013d0134c7d55c1b06273e900040745c151c001b5b48b8b6cf1b20601c0002260165b0343b513434800063853e9034c7f4c7f4fff4c1fd013d0134c7d55c1b06273e900040745c151c001b5b48b89541f6cf1b20601e01a481010b240259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de2206e923070e020206ef2d0806f2d104c5f0c923073e020206ef2d0806f2d105c5f0c923072e0206ef2d0806f2d107c5f0c9171e0703502014820220191b03afb513434800063853e9034c7f4c7f4fff4c1fd013d0134c7d55c1b06273e900040745c151c001b5b48b89541f6cf1b20481ba48c1b66481bbcb4201bcb5bc378881ba48c1b77a021013a81010b240259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de23502014823250160aad5ed44d0d200018e14fa40d31fd31fd3ffd307f404f404d31f55706c189cfa400101d1705470006d6d22e2db3c6c81240002250164aa7ded44d0d200018e14fa40d31fd31fd3ffd307f404f404d31f55706c189cfa400101d1705470006d6d22e25507db3c6c8126002c813ee821c2009321c1599170e2f2f4a5ae5250b0c30004e601d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e14fa40d31fd31fd3ffd307f404f404d31f55706c189cfa400101d1705470006d6d22e209925f09e007d70d1ff2e082218210f87fb807bae302218210b0d085cfbae3022182108798b9c4bae3022182100a2be020ba282a2e3303ea31d33f31d401d001d401d001d401d001d30730f84281526d2681010b2359f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de26ef2f482009b10f8416f24135f0382103b9aca00bef2f481010b708b087070708b088b7233933333365618532851bc10bf10ae095561c855c0db3cc944405230353b2903f6206e953059f45930944133f413e206a407081056104510345092db3cf8416f24135f0382103b9aca00a1208208989680bc8ec28208989680a1727088104c10246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00923038e25506393d4103fc31d33f31d401d001d200d200d307d401d001d430d0f8422781010b2259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de2815c58216eb3f2f482009b10f8416f24135f0382103b9aca00bef2f4206ef2d0806f2d30317056109223b39170e28e1856119224b39170e29223b39170e292307f952692307fdfe2e30d352b2c0004307f02fc1116a411168e3110355f052a9329c2009170e29329c1599170e28e1429a5ae561021b091309901111001b10ea40e0fe2de7f0c92307fde0b9e0411110403111003102f50ec5f05e2f823106b105a104910384760105d104c4d3c81010b502dc855c0db3cc922103401206e953059f45930944133f413e2f8416f24135f033b2d01ee82103b9aca00a1208208989680bc8ec28208989680a1727088104510246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00923031e210575514c87f01ca0055705078ce15cb1f13cb1fcbffcb07f400f400cb1fc9ed543d02fc31d33f31d401d001d401d001d430d0d401d001d307d401d001d200d200d307d401d001d430d0f84282009b10f8416f24135f0382103b9aca00bef2f42b81010b2259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de2206e708b087070708b088b723393333336561853290a11150a091114095613090811130807352f03fa0611130605041113040302111302011113303156139257148e105f0b09206ef2d0806f2d303111135590e211128ec41117a40811180807061116060511150504111404031113030211190201111a011110db3c111901111801071117070611160605111505041114040311130302111202106f925710e2702c9170e30d39303100065610b301fe92307f8e182d9221b39170e2935610b39170e292307f952392307fdfe2e21116a411168e403f5b3d3d269325c2009170e29325c1599170e28e1425a5ae561021b091309901111001b10ea40e0fe2de7f08923a7f910ae2103c105b106a10381057105603059a104d103c102b50a85f05e2f823103b4a901817164c5081010b3203f650eec855c0db3cc943305230206e953059f45930944133f413e2f8416f24135f0382103b9aca00a1208208989680bc8ec28208989680a1727088104510246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00923031e2105755143b3d4102f0e30221821060edae6dbae302018210946a98b6ba8e5cd33f30c8018210aff90f5758cb1fcb3fc91068105710461035443012f84270705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c87f01ca0055705078ce15cb1f13cb1fcbffcb07f400f400cb1fc9ed54e05f09f2c082343e04fc31d33f31d401d001d401d001d401d001d30730f8428200f4c5f8416f24135f038209312d00bef2f42581010b2259f40b6fa192306ddf206e92306d8e87d0db3c6c1d6f0de28200f44c216eb3f2f4206ef2d0806f2d383939536c01f90101f901bd9136e30d108b10ad109c107d1036552281010b4e1ec855c0db3cc9433035363b3c0060fa40d401d001d401d001d401d0d401d001d307d200d401d001d200d200d307d401d001d401d001d31f3010ad10ac10ab027e0811140807111307061112060511110504111004103f02111502011116011112db3c2bdb3c11150111140107111307061112060511110504111004103f102e37390134eda2edfb8b08521001f90101f901ba9130e070935302b98ae85b3800e2238101012259f40d6fa192306ddf206e92306d9cd0d401d001d31f596c126f02e2206eb38e1120206ef2d0806f22302301f90101f901ba9170e28e32206ef2d0806f2231a520c100923070de0281010103c85901c8ce12cdcb1fc91034206e953059f45a30944133f415e201db31e030a4017aeda2edfb8b08521001f90101f901ba9130e070935302b98ae8308101010171c85901c8ce12cdcb1fc922103401206e953059f45a30944133f415e201a43a00d6238101012259f40d6fa192306ddf206e92306d9cd0d401d001d31f596c126f02e2206eb38e1120206ef2d0806f22302301f90101f901ba9170e28e2c206ef2d0806f2231a41281010159c85901c8ce12cdcb1fc9103412206e953059f45a30944133f415e201db31e030a4006450cdce0ac8ce1acd08c8ce18cdc807c8ce17cd15cb0713ca0001c8cecdca00ca0012cb0702c8ce12cd02c8ce12cd12cb1fcd02e05230206e953059f45930944133f413e2f8416f24135f038209312d00a12082084c4b40bc8ec282084c4b40a1727088104510246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00923031e2105755143d41001c000000004578636573732067617303ce31d33f31fa003010671056104510344138db3c810c75f8276f10821005f5e100a152a0bbf2f47270882a040c552010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0055063f40410010f84228c705f2e084001c000000005769746864726177616c003ac87f01ca0055705078ce15cb1f13cb1fcbffcb07f400f400cb1fc9ed54653d7095');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initVilitigoCounter_init_args({ $$type: 'VilitigoCounter_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const VilitigoCounter_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    3189: { message: "Keep 0.1 TON for fees" },
    16104: { message: "Invalid constellation number" },
    21101: { message: "Already registered" },
    23640: { message: "Register first" },
    39696: { message: "Send at least 1 TON" },
    62540: { message: "Not registered yet — use JoinAndMint first" },
    62661: { message: "Send at least 0.02 TON for gas" },
} as const

export const VilitigoCounter_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Keep 0.1 TON for fees": 3189,
    "Invalid constellation number": 16104,
    "Already registered": 21101,
    "Register first": 23640,
    "Send at least 1 TON": 39696,
    "Not registered yet — use JoinAndMint first": 62540,
    "Send at least 0.02 TON for gas": 62661,
} as const

const VilitigoCounter_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UserData","header":null,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"country","type":{"kind":"simple","type":"string","optional":false}},{"name":"city","type":{"kind":"simple","type":"string","optional":false}},{"name":"age","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"hasConstellation","type":{"kind":"simple","type":"bool","optional":false}},{"name":"constName","type":{"kind":"simple","type":"string","optional":false}},{"name":"isRare","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isLegendary","type":{"kind":"simple","type":"bool","optional":false}},{"name":"discoveryNumber","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"story","type":{"kind":"simple","type":"string","optional":false}},{"name":"pixelColor","type":{"kind":"simple","type":"string","optional":false}},{"name":"mintedAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"CityCount","header":null,"fields":[{"name":"city","type":{"kind":"simple","type":"string","optional":false}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Register","header":4169119751,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"country","type":{"kind":"simple","type":"string","optional":false}},{"name":"city","type":{"kind":"simple","type":"string","optional":false}},{"name":"age","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"MintConstellation","header":2966455759,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"constName","type":{"kind":"simple","type":"string","optional":false}},{"name":"isRare","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isLegendary","type":{"kind":"simple","type":"bool","optional":false}},{"name":"discoveryNumber","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"story","type":{"kind":"simple","type":"string","optional":false}},{"name":"pixelColor","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"JoinAndMint","header":2274933188,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"country","type":{"kind":"simple","type":"string","optional":false}},{"name":"city","type":{"kind":"simple","type":"string","optional":false}},{"name":"age","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"constName","type":{"kind":"simple","type":"string","optional":false}},{"name":"isRare","type":{"kind":"simple","type":"bool","optional":false}},{"name":"isLegendary","type":{"kind":"simple","type":"bool","optional":false}},{"name":"discoveryNumber","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"story","type":{"kind":"simple","type":"string","optional":false}},{"name":"pixelColor","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"UpdateProfile","header":170647584,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"name","type":{"kind":"simple","type":"string","optional":false}},{"name":"country","type":{"kind":"simple","type":"string","optional":false}},{"name":"city","type":{"kind":"simple","type":"string","optional":false}},{"name":"age","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"AdminWithdraw","header":1626189421,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"VilitigoCounter$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"totalCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"photoCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"realConstellationsMap","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"realConstellationsFound","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"users","type":{"kind":"dict","key":"address","value":"UserData","valueFormat":"ref"}},{"name":"cityCounts","type":{"kind":"dict","key":"int","value":"CityCount","valueFormat":"ref"}},{"name":"cityCountsSize","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const VilitigoCounter_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "Register": 4169119751,
    "MintConstellation": 2966455759,
    "JoinAndMint": 2274933188,
    "UpdateProfile": 170647584,
    "AdminWithdraw": 1626189421,
}

const VilitigoCounter_getters: ABIGetter[] = [
    {"name":"totalCount","methodId":107884,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"photoCount","methodId":119509,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getUser","methodId":114923,"arguments":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"UserData","optional":true}},
    {"name":"isRegistered","methodId":104754,"arguments":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"hasConstellation","methodId":79526,"arguments":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"realConstellationsFound","methodId":80195,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"realConstellationsMap","methodId":84699,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"isConstellationDiscovered","methodId":120445,"arguments":[{"name":"number","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getCityCount","methodId":71427,"arguments":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"CityCount","optional":true}},
    {"name":"cityCountsSize","methodId":69634,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"starLevel","methodId":110800,"arguments":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","methodId":104128,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const VilitigoCounter_getterMapping: { [key: string]: string } = {
    'totalCount': 'getTotalCount',
    'photoCount': 'getPhotoCount',
    'getUser': 'getGetUser',
    'isRegistered': 'getIsRegistered',
    'hasConstellation': 'getHasConstellation',
    'realConstellationsFound': 'getRealConstellationsFound',
    'realConstellationsMap': 'getRealConstellationsMap',
    'isConstellationDiscovered': 'getIsConstellationDiscovered',
    'getCityCount': 'getGetCityCount',
    'cityCountsSize': 'getCityCountsSize',
    'starLevel': 'getStarLevel',
    'balance': 'getBalance',
    'owner': 'getOwner',
}

const VilitigoCounter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Register"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintConstellation"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JoinAndMint"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateProfile"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AdminWithdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class VilitigoCounter implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = VilitigoCounter_errors_backward;
    public static readonly opcodes = VilitigoCounter_opcodes;
    
    static async init(owner: Address) {
        return await VilitigoCounter_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const __gen_init = await VilitigoCounter_init(owner);
        const address = contractAddress(0, __gen_init);
        return new VilitigoCounter(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new VilitigoCounter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  VilitigoCounter_types,
        getters: VilitigoCounter_getters,
        receivers: VilitigoCounter_receivers,
        errors: VilitigoCounter_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Register | MintConstellation | JoinAndMint | UpdateProfile | AdminWithdraw | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Register') {
            body = beginCell().store(storeRegister(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintConstellation') {
            body = beginCell().store(storeMintConstellation(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JoinAndMint') {
            body = beginCell().store(storeJoinAndMint(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateProfile') {
            body = beginCell().store(storeUpdateProfile(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AdminWithdraw') {
            body = beginCell().store(storeAdminWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getTotalCount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('totalCount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getPhotoCount(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('photoCount', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getGetUser(provider: ContractProvider, wallet: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(wallet);
        const source = (await provider.get('getUser', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUserData(result_p) : null;
        return result;
    }
    
    async getIsRegistered(provider: ContractProvider, wallet: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(wallet);
        const source = (await provider.get('isRegistered', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getHasConstellation(provider: ContractProvider, wallet: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(wallet);
        const source = (await provider.get('hasConstellation', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getRealConstellationsFound(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('realConstellationsFound', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getRealConstellationsMap(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('realConstellationsMap', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getIsConstellationDiscovered(provider: ContractProvider, number: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(number);
        const source = (await provider.get('isConstellationDiscovered', builder.build())).stack;
        const result = source.readBoolean();
        return result;
    }
    
    async getGetCityCount(provider: ContractProvider, index: bigint) {
        const builder = new TupleBuilder();
        builder.writeNumber(index);
        const source = (await provider.get('getCityCount', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleCityCount(result_p) : null;
        return result;
    }
    
    async getCityCountsSize(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('cityCountsSize', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getStarLevel(provider: ContractProvider, wallet: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(wallet);
        const source = (await provider.get('starLevel', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('balance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}