export DOMAIN=event.domain

# gen CA
openssl genrsa -out ca.key 4096
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt \
  -subj "/C=XX/ST=State/L=City/O=Organization/OU=Unit/CN=TestingCA"
# gen admin cert
openssl genrsa -out admin.key 2048
openssl req -new -key admin.key -out admin.csr \
  -subj "/C=XX/ST=State/L=City/O=Organization/OU=Unit/CN=admin.$DOMAIN"
openssl x509 -req -in admin.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out admin.crt -days 365 -sha256 -extfile admin.san.ext
# gen customer cert
openssl genrsa -out customer.key 2048
openssl req -new -key customer.key -out customer.csr \
  -subj "/C=XX/ST=State/L=City/O=Organization/OU=Unit/CN=customer.$DOMAIN"
openssl x509 -req -in customer.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out customer.crt -days 365 -sha256 -extfile customer.san.ext
# gen terminal cert
openssl genrsa -out terminal.key 2048
openssl req -new -key terminal.key -out terminal.csr \
  -subj "/C=XX/ST=State/L=City/O=Organization/OU=Unit/CN=terminal.$DOMAIN"
openssl x509 -req -in terminal.csr -CA ca.crt -CAkey ca.key -CAcreateserial \
  -out terminal.crt -days 365 -sha256 -extfile terminal.san.ext
