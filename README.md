# c-server

[![License](https://img.shields.io/badge/license-MIT-green)](https://opensource.org/licenses/MIT)
[![pipeline status](https://gitlab.inria.fr/concordant/software/c-server/badges/master/pipeline.svg)](https://gitlab.inria.fr/concordant/software/c-server/-/commits/master)
[![coverage report](https://gitlab.inria.fr/concordant/software/c-server/badges/master/coverage.svg)](https://gitlab.inria.fr/concordant/software/c-server/-/commits/master)

Server code for the C-Labbook demo.

Install dependencies with:

```bash
npm install
```

Set database name and credentials and run server:

```bash
export DBNAME=my-database COUCHDB_USER=my-user COUCHDB_PASSWORD=my-passwd
npm start
```

Need to start a CouchDB server beforehand. Can customize the database url with the environment variable COUCHDB_URL. You might need to change the binding address in CouchDB admin panel to allow peers to connect to the database.

Run tests with:

```bash
npm test
```

## Requirements

Node: v10.15+
NPM: v6.13+

(Project might work with older Node and NPM versions)
