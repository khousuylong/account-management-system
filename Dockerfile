FROM cypress/base:14.15.4
ENV CHECKOUT_QUIT_REDIRECT_URL ""
ENV CHECKOUT_SUCCESS_REDIRECT_URL ""
ENV UPDATE_CARD_SUCCESS_REDIRECT_URL ""
ENV UPDATE_CARD_QUIT_REDIRECT_URL ""
ENV BILLING_SERVICE_ENDPOINT ""
ENV RECURLY_PUBLIC_KEY ""
RUN apt-get update
RUN apt-get install xvfb
RUN mkdir -p /var/www/account-management-system
WORKDIR /var/www/account-management-system
COPY . /var/www/account-management-system
RUN npm install
RUN npm run next:build
CMD ["npm", "run", "next:start"]
