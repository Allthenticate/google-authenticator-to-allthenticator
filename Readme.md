# Importing to ALLthenticator

After installing ALLthenticator, I needed a way to import my Google Authenticator OTP codes because I wan't going to go
to 50 websites and register a new authenticator. I found [a Gist](https://gist.github.com/mapster/4b8b9f8f6b92cc1ca58ae5506e0508f7) by [Alexander Hoem Rosbach](https://gist.github.com/mapster) that decoded the QR codes and printed them to the terminal. I slightly modified this code to convert the data to `otpauth://` URLs so I could turn them into QR codes to import into ALLthenticator.

[!IMPORTANT] The below sections are mostly from Alexander's Gist, but have been slightly modified for clarification. The "I", they speak of is Alexander, not me.

# Export Google Authenticator secret OTP-keys
I recently got myself a Yubikey and wanted to set up the Yubico Authenticator with all the OTPs I had in Google Authenticator.
Unfortunately Yubico Authenticator doesn't support scanning the QR-code that the Google Authenticator generates when you export
the OTP-keys, and it seemed like quite the daunting task to log in to every service to generate new OTP-keys. So I decided to
have a look at the contents of the QR code, to see if I could import the keys into Yubico Authenticator in one go. Luckily
I found a [blog post by Alex Bakker](https://alexbakker.me/post/parsing-google-auth-export-qr-code.html) that describes the 
data format.

# Transfer QR-code to computer
Unfortunately, but likely for the best, the security policy of Google Authenticator won't allow you to take a screenshot of
the generated export-all QR-code. Since my phone is also the only device I own with a decent camera, I had to resign to snap
a picture of QR-code on the phone screen using the built-in webcam of my laptop. If you also use a low quality camera you 
might run into the same issue that I did, namely that the picture will have too much noice for QR-code readers to interpret
the QR-code. The easiest way around it was split the export into multiple QR-codes, which for me meant two codes instead of 
twenty. I used the Linux desktop app [Kamoso](https://userbase.kde.org/Kamoso) to snap the pictures.

# Extract OTP-keys
To extract the OTP-keys from the Google Authenticator QR-code is a four-step procedure:
1. Extract data-URL from the QR-code
2. Base64 Decode the query parameter `data`
3. Decode the protobuf message
4. For each OTP-key; base32 encode the secret field

## Requirements
- nodejs
- zbar-tools (you will need to install this via your package manager)

The `zbar-tools` package includes a tool to extract URLs from QR-codes. I did try to use `jimp` and `qrcode-reader` in the 
javascript, but it didn't work straight out the box so I didn't bother spending more time to get it to work.

## Usage
1. Clone this Git repository
2. Install dependencies
```bash
./install_dependencies.sh
```
3. Install node packages
```
npm i
```
4. Take a screenshot of your exported QR code from Google Authenticator
5. Extract codes, which will be automatically displayed and scan them with the Allthenticator
```bash
./otp-codes.sh <path to screenshot>
```
    Press `ESC` to advance each picture
6. Import each code, one by one, using ALLthenticator's user interface
