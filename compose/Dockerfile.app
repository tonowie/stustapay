FROM cimg/android:2024.11.1 as build

# app directory
WORKDIR /usr/src/app

# change to java 17
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
RUN sudo update-alternatives --set java $JAVA_HOME/bin/java

# initialize the wrapper
COPY app/gradle /usr/src/app/gradle
COPY app/gradlew /usr/src/app/
RUN ./gradlew -version

# get the app sources
COPY app/ /usr/src/app/
# keep also git repo as it is used during the build
COPY .git/ /usr/src/.git/

# overwrite configuration for custom SSL certificate
COPY compose/app/src/main/AndroidManifest.xml /usr/src/app/app/src/main/AndroidManifest.xml
COPY compose/app/src/main/res/xml/network_security_config.xml /usr/src/app/app/src/main/res/xml/network_security_config.xml
COPY compose/ssl/terminal.crt /usr/src/app/app/src/main/res/raw/terminal.crt

# prepare the build
RUN sudo chown circleci:circleci -R . &&\
    mkdir -p app/build/outputs

CMD ["./gradlew", "build"]
