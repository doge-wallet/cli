

function parse(text) {
    let address = '';
    let privateKey = '';
    let mnemonic = [];

    text.split(' ').forEach((item) => {
        if (!item) {
            return;
        }

        if (item.length == 34) {
            address = item;
            return;
        }

        if (item.length == 52) {
            privateKey = item;
            return;
        }

        mnemonic.push(item);
    });


    let data = {};

    if (address) {
        data.address = address;
    }

    if (privateKey) {
        data.privateKey = privateKey;
    }

    if (mnemonic.length > 0) {
        data.mnemonic = mnemonic.join(' ');
    }

    return data;
    
}


function mask(item) { 

    if (typeof item == 'string') {
        item = parse(item);
    }

    let { address, privateKey, mnemonic, } = item;

    if (privateKey) {
        privateKey = `${privateKey.slice(0, 4)}...${privateKey.slice(-4)}`;
    }

    if (mnemonic) {
        let a = mnemonic.split(' ');
        mnemonic = `${a[0]} ... ${a.at(-1)}`;
    }

    return { address, privateKey, mnemonic, };
}

function toMessage(item) { 

    let { address, privateKey, mnemonic, } = mask(item);

    let list = [];

    if (address) {
        list.push(address);
    }

    if (privateKey) {
        list.push(privateKey.cyan);
    }

    if (mnemonic) {
        list.push(mnemonic.green);
    }

    return list.join(' ');
}



export { parse, mask, toMessage, };
