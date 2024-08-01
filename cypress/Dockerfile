FROM loadimpact/k6 as k6
FROM cypress/browsers:latest

COPY --from=k6 /usr/bin/k6 /usr/bin/k6

RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
    apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

#Bundle app source
ADD . /home/node/app

WORKDIR /home/node/app

# install dependencies
RUN yarn config set registry https://registry.npmjs.com/ && \
    yarn --frozen-lockfile && \
    $(yarn bin)/cypress verify