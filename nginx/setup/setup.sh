mkdir -p /etc/letsencrypt/live/localhost/
touch /etc/letsencrypt/live/localhost/fullchain.pem
touch /etc/letsencrypt/live/localhost/privkey.pem

if [[ "${DOMAIN}" == "localhost" ]]; then
    openssl req -x509 -out /etc/letsencrypt/live/localhost/fullchain.pem -keyout /etc/letsencrypt/live/localhost/privkey.pem \
        -newkey rsa:2048 -nodes -sha256 \
        -subj '/CN=localhost' -extensions EXT -config <( \
        printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
else
    certbot certonly --reinstall --webroot --webroot-path=/var/www/certbot \
        --email ${DOMAIN_EMAIL} --agree-tos --no-eff-email \
        -d $DOMAIN -d www.$DOMAIN
fi