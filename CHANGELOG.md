## [1.0.2](https://bitbucket.org/mangomap/account-management-system/compare/v1.0.1...v1.0.2) (2021-02-08)


### Bug Fixes

* **docker-compose:** added command to docker-compose dev so next is run with browser refresh on change ([c6a11e0](https://bitbucket.org/mangomap/account-management-system/commits/c6a11e01fdd8cf4b6845088c4b2f10d11de08e54))

## [1.0.1](https://bitbucket.org/mangomap/account-management-system/compare/v1.0.0...v1.0.1) (2021-02-08)


### Bug Fixes

* **docker-compose:** updated docker-compose.yml to version 3.7 ([5ef5ca8](https://bitbucket.org/mangomap/account-management-system/commits/5ef5ca831ad4033a47e1bb8b95e8dff3e4d7076a))

# 1.0.0 (2021-02-07)


### Bug Fixes

* **docker:** corrected problems with docker setup where it was only really configured for development ([accef96](https://bitbucket.org/mangomap/account-management-system/commits/accef968b81909f17da2d416e5389ecbb5c49573))
* **docker-compose:** fixed npm start to not use mounted directory and added start:dev ([28cf400](https://bitbucket.org/mangomap/account-management-system/commits/28cf400e8c204019b622fed0b0805648fc1bfc11))
* **docker-compose:** updated package and compose to run tests on the container rather than local machine ([b3d9122](https://bitbucket.org/mangomap/account-management-system/commits/b3d9122eb6bb6cbd46e0ed77b6010460862ddf25))
* **package.json:** added release section for use with symantic release ([7fb754f](https://bitbucket.org/mangomap/account-management-system/commits/7fb754fbc5f1cb8fea5af57b78264009801cd1f1))
* **package.json:** Changed cypress open to cypress run headless so we can run tests on CI ([d021d37](https://bitbucket.org/mangomap/account-management-system/commits/d021d37e85b8dcf7209d6ef084fb41f5783e02fe))
* **package.json:** turned off tty for test run so that it will work with bitbucket pipeline ([0a4410c](https://bitbucket.org/mangomap/account-management-system/commits/0a4410c42835a9e020810b76ea519ab4d102609a))
* **pipeline:** added bitbucket pipeline for CI/CD and removed .next cache and added it to .gitignore ([a9042b9](https://bitbucket.org/mangomap/account-management-system/commits/a9042b9fab3d1f5986301f113e53997f621bdab1))
* **pipeline:** removed steps to install cypress dependencies on build server as it's now run in the container ([9df3c69](https://bitbucket.org/mangomap/account-management-system/commits/9df3c69fb9eda51faa5af477335cf97ca21b21a2))
* **pipeline:** updated pipeline to use Mango base image ([1224584](https://bitbucket.org/mangomap/account-management-system/commits/12245841b51ef477adfc3057d691f39e8014f01a))
* **plan:** fixed ([201d08f](https://bitbucket.org/mangomap/account-management-system/commits/201d08fc8004bb7657fb08f89847bc864943cbfc))


### Features

* **3-d-secure:** added handler for 3-de-secure ([5165fdf](https://bitbucket.org/mangomap/account-management-system/commits/5165fdf782c6879a6fa9141ff326d5678382aa01))
* **back button:** implement back button and its test ([adbc2d8](https://bitbucket.org/mangomap/account-management-system/commits/adbc2d8a3d083975c03d5e1672a0dba94e1dd786))
* **close button:** implement close button and its test ([68b7500](https://bitbucket.org/mangomap/account-management-system/commits/68b7500b32940dcc9ce623ccdc4082d9d5482a83))
* **company info:** added validation ([528f48b](https://bitbucket.org/mangomap/account-management-system/commits/528f48b9a6228ac9f8e1ef2aae952c6fe2c8e446))
* **company info:** finish the company info ([e5024e5](https://bitbucket.org/mangomap/account-management-system/commits/e5024e5b701042a26ed4b00d0cd5129451f82f6e))
* **company info:** populate company info form ([d6c140c](https://bitbucket.org/mangomap/account-management-system/commits/d6c140cb65851bf33051fbc90a38709f4356518c))
* **companyinfo:** first commit for company info view ([86150de](https://bitbucket.org/mangomap/account-management-system/commits/86150de0495c007c74d23aff812d94dbb0f39611))
* **error:** show proper error message ([639acad](https://bitbucket.org/mangomap/account-management-system/commits/639acad4d0b59044c85105c41fa2ce3312b2fc79))
* **index.js:** get graphql client work inside getStaticProps ([29003bd](https://bitbucket.org/mangomap/account-management-system/commits/29003bde072bb9f4519bfaf02248868f4cd9d98b))
* **initapollo.js:** render data in server, then restore into local cache ([50e4a31](https://bitbucket.org/mangomap/account-management-system/commits/50e4a316be1c0009a4d40c4c9b00edb170f29eb2))
* **node_modules:** installed neccessary node_modules for beginning of development ([fe51b61](https://bitbucket.org/mangomap/account-management-system/commits/fe51b61348acb10fb1eb83cda9383e07337c47e9))
* **package.json and test:** added node_module for testing ([ce1bbdf](https://bitbucket.org/mangomap/account-management-system/commits/ce1bbdf4a57f8ca95602a1078b07592710624c03))
* **payment form:** update payment form ([43deb16](https://bitbucket.org/mangomap/account-management-system/commits/43deb1677f67648aab4544ceeffde42e69c69022))
* **payment method:** populate payment method view and added recurly ([985faa0](https://bitbucket.org/mangomap/account-management-system/commits/985faa0c0f787507033008ff31935f1af6e3d64c))
* **plan:** added plan review page ([89668eb](https://bitbucket.org/mangomap/account-management-system/commits/89668ebc0efe0f0621936e0cb6990ddd283a27fc))
* **plan review:** getting plan review ([1d464c3](https://bitbucket.org/mangomap/account-management-system/commits/1d464c369386606eb119bfcea4f535979999029c))
* **plan review:** show plan review page ([d53e857](https://bitbucket.org/mangomap/account-management-system/commits/d53e857a18292668c78344db90c387868ebbc816))
* **purchase:** set put request for purchasing ([c73fc2f](https://bitbucket.org/mangomap/account-management-system/commits/c73fc2f9e41fbf3897ea496d6cd1de1e350944e0))
* **review order:** create ui for review order ([f158397](https://bitbucket.org/mangomap/account-management-system/commits/f15839750677253cd6a11ea33394921d058b88b6))
* **subscription:** create subscription after successfully created billing ([0ffef25](https://bitbucket.org/mangomap/account-management-system/commits/0ffef25d97a29ba5035fd106ef05c373e6a05d72))
* **validation:** added recurly form validation ([fbc0d9f](https://bitbucket.org/mangomap/account-management-system/commits/fbc0d9ffb4e645f7780fc70114dd2c35e1efcc94))
* change name of test file ([8bdee1b](https://bitbucket.org/mangomap/account-management-system/commits/8bdee1bcf79a8ccbfe59282ec55385287cbe32a0))
