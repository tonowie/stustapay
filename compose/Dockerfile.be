FROM python:3.12-bookworm AS build

# ensure immediate console output
ENV PYTHONUNBUFFERED=true

WORKDIR /app

# update pip
RUN pip install --upgrade pip

# activate virtualenv
RUN pip install virtualenv
RUN python3 -m virtualenv -p python3 .venv &&\
    chmod 755 .venv/bin/activate &&\
    .venv/bin/activate

# add rust to the image
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y &&\
    export PATH=~/.cargo/bin:$PATH

# add debian packages
RUN apt-get update &&\
apt-get install -y texlive latexmk

# install the project
COPY Makefile setup.py pyproject.toml ./
COPY stustapay ./stustapay/
RUN pip install -e '.[dev,test]'

# add configuration
COPY compose/stustapay/config.yaml /etc/stustapay/config.yaml

ARG DOMAIN_NAME
ARG APP_SECRET_TOKEN

# adapt image to domain
RUN sed -i "s/event\.domain/$(printf '%s' "$DOMAIN_NAME" | sed 's/[&/\]/\\&/g')/g" /etc/stustapay/config.yaml
# use configured token
RUN sed -i "s/yourtokenhere/$(printf '%s' "$APP_SECRET_TOKEN" | sed 's/[&/\]/\\&/g')/g" /etc/stustapay/config.yaml
