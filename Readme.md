# Export Google Authenticator secret OTP-keys
I recently got myself a Yubikey and wanted to set up the Yubico Authenticator with all the OTPs I had in Google Authenticator.
Unfortunately Yubico Authenticator doesn't support scanning the QR-code that the Google Authenticator generates when you export
the OTP-keys, and it seemed like quite the daunting task to log in to every service to generate new OTP-keys. So I decided to
have a look at the contents of the QR code, and see if I could import the keys into Yubico Authenticator in one go. Luckily
I found a [blog post by Alex Bakker](https://alexbakker.me/post/parsing-google-auth-export-qr-code.html) that describes the 
data format.

# Transfer QR-code to computer
Unfortunately, but likely for the best, the security policy of Google Authenticator won't allow you to take a screenshot of
the generated export-all QR-code. Since my phone is also the only device I own with a decent camera, I had to resign to snap
a picture of QR-code on the phone screen using the built-in webcam of my laptop. If you also use a low quality camera you 
might run into the same issue that I did, namely that the picture will have too much noice for QR-code readers to interpret
the QR-code. The easiest way around it was split the export into two QR-codes. I used the Linux desktop app 
[Kamoso](https://userbase.kde.org/Kamoso) to snap the pictures.

# Extract OTP-keys
To extract the OTP-keys from the Google Authenticator QR-code is a four-step procedure:
1. Extract data-URL from the QR-code
2. Base64 Decode the query parameter `data`
3. Decode the protobuf message
4. For each OTP-key; base32 decode the secret field

## Requirements
- nodejs
- zbar-tools

The `zbar-tools` package includes a tool to extract URLs from QR-codes. I did try to use `jimp` and `qrcode-reader` in the 
javascript, but it didn't work straight out the box so I didn't bother spending more time to get it to work.

## Usage
1. Download the files `package.json`, `index.js`, `migration-payload.proto` and `otp-codes.sh` to an empty directory
2. Make `otp-codes.sh` executable: `chmod +x otp-codes.sh`
3. Extract codes `./otp-codes.sh <path to qr-code image>`

