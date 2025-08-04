#!/bin/bash

# Decode all the QR codes given on the command line
for qrfile in "$@"; do
    qrcode="$(zbarimg -q --raw "$qrfile" 2>/dev/null)"
    url="${qrcode/#QR-Code:}"
    node index.js "$url"
done
