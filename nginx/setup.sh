# First time configuration for nginx
curl -L --create-dirs -o etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
openssl dhparam -out etc/letsencrypt/ssl-dhparams.pem 2048