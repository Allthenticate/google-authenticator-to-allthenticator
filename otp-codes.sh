#!/bin/bash

# Decode all the QR codes given on the command line
for qrfile in "$@"; do
    qrcode="$(zbarimg -q --raw "$qrfile" 2>/dev/null)"
    mainurl="${qrcode/#QR-Code:}"
    urls=$(node index.js "$mainurl")
    for url in $urls; do
        echo "Generating image for URI: $url"
        qrencode -s 10 "$url" -o /tmp/qr_allthenticator.png
        feh /tmp/qr_allthenticator.png
        rm /tmp/qr_allthenticator.png
    done
done
