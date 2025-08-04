#!/bin/bash

counter=0

for x in `cat urls.txt`
do
	qrencode -s 10 "$x" -o qr$counter.png
	((counter++))
done
