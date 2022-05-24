FROM gvenzl/oracle-xe:21

USER root
WORKDIR /usr/src/app

RUN microdnf -y module enable nodejs:16 && \
    microdnf -y install nodejs npm

COPY package.json tailwind.config.cjs tsconfig.json /usr/src/app/
RUN npm install
COPY src /usr/src/app/src/

EXPOSE 3000
RUN npm run build:prod
USER oracle
CMD node dist/index