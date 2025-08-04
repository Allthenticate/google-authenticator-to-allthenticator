const protobuf = require("protobufjs");
const fs = require('fs');
const base32 = require('hi-base32');

async function decodeMessage(buffer) {
    const root = await protobuf.load("migration-payload.proto");
    const payload = root.lookupType("MigrationPayload");
    const err = payload.verify(buffer);
    if (err) {
        throw err;
    }
    const message = payload.decode(buffer);
    const obj = payload.toObject(message);

    return payload.toObject(message);
}

async function printOTPCodes(otpBuffer) {
    const payload = await decodeMessage(otpBuffer);

    const otpArray = payload.otpParameters;
    for(let i = 0; i < otpArray.length; i++) {
        const otp = otpArray[i];
	    console.log("otpauth://totp/" + 
            (otp.issuer == undefined ? "" : otp.issuer) + 
            ":" + otp.name + 
            "?secret=" + base32.encode(otp.secret))
    }
}

const url = new URL(process.argv[2]);
const otpBuffer = Buffer.from(url.searchParams.get('data'), 'base64');
printOTPCodes(otpBuffer).catch(err => console.error(err));
