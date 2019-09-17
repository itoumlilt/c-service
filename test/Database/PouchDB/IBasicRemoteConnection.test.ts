import uuid = require("uuid");
import {Document} from "../../../src/Database/DataTypes/Interfaces/Types";
import {PouchDB} from "../../../src/Database/Implementation/Adapters/PouchDB/Adapter";
import PouchDBDataSource, {
    AdapterParams,
    ConnectionProtocol,
} from "../../../src/Database/Implementation/PouchDB/DataSource/PouchDBDataSource";
import {IBasicConnection, IDBObject} from "../../../src/Database/Interfaces/Types";

class TestObject {
    constructor(public foo: string = "foo") {
    }
}

// FIX: TESTS DONT ALWAYS EXIT
describe("Get tests", () => {
    // const TEST_KEY = "test_key";
    let connection: IBasicConnection;

    beforeAll(() => {
        const params: AdapterParams = {
            connectionParams: {},
            dbName: "testdb", host: "localhost", port: 5984, protocol: ConnectionProtocol.HTTP,
        };
        const dataSource = new PouchDBDataSource(PouchDB, params);
        return dataSource.connection({autoSave: false}).then((c) => connection = c);

    });

    afterAll(() => {
        return connection.close()
            .catch((error) => fail(error));
    });

});

describe("Sync tests", () => {
    const TEST_KEY = uuid();
    let connection1: IBasicConnection;
    let connection2: IBasicConnection;
    const remoteDBs = ["http://localhost:5984/testdb"];

    beforeAll(() => {
        const params1: AdapterParams = {
            connectionParams: {adapter: "memory"},
            dbName: "testdb",
            remoteDBs,
        };
        const params2: AdapterParams = {
            connectionParams: {},
            dbName: "testdb", host: "localhost", port: 5984, protocol: ConnectionProtocol.HTTP,
        };
        const dataSource1 = new PouchDBDataSource(PouchDB, params1);
        const dataSource2 = new PouchDBDataSource(PouchDB, params2);
        return dataSource1.connection({autoSave: false})
            .then((c) => connection1 = c)
            .then(() => dataSource2.connection({autoSave: false}))
            .then((c) => connection2 = c);

    });
    it("test", (done) => {
        const random = uuid();
        const sub = connection1.subscribe<TestObject>(TEST_KEY, {
            change: (key, newObj) => {
                if (newObj.current().foo === random) {
                    done();
                }
            },
        });

        connection2.get<TestObject>(TEST_KEY, new TestObject())
            .then((obj: Document<TestObject>) => {
                obj.update(new TestObject(random));
                return obj.save();
            })
            // .then(() => done())
            .catch((error) => fail(error));
    });

    afterAll(() => {
        return connection1.close()
            .then(() => connection2.close())
            .catch((error) => fail(error));
    });
});
