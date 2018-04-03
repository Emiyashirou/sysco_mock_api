var assert = require("assert");
var chai = require("chai");
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

var server = "http://localhost:3000";

describe("/GET groups", () => {
    it("it should GET all the groups", (done) => {
        chai.request(server)
            .get("/groups")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/GET one group", () => {
    it("it should GET one group by id", (done) => {
        chai.request(server)
            .get("/groups/01")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/POST new group", () => {
    it("it should post a new group", (done) => {
        chai.request(server)
            .post("/groups")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/PUT one group", () => {
    it("it should put an existing group", (done) => {
        chai.request(server)
            .put("/groups/01")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/OPTIONS groups", () => {
    it("it should get group options", (done) => {
        chai.request(server)
            .options("/groups")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/GET locations", () => {
    it("it should GET all the locations", (done) => {
        chai.request(server)
            .get("/locations")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/GET one location", () => {
    it("it should GET one location by id", (done) => {
        chai.request(server)
            .get("/locations/01-000001")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/POST new location", () => {
    it("it should post a new location", (done) => {
        chai.request(server)
            .post("/locations")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/PUT one location", () => {
    it("it should put an existing location", (done) => {
        chai.request(server)
            .put("/locations/01-000001")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/OPTIONS locations", () => {
    it("it should get locations options", (done) => {
        chai.request(server)
            .options("/locations")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/GET looksup", () => {
    it("it should GET all the looksup", (done) => {
        chai.request(server)
            .get("/looksup")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/GET looksup by category", () => {
    it("it should GET looksup by category", (done) => {
        chai.request(server)
            .get("/looksup/roles")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/OPTIONS looksup", () => {
    it("it should get looksup options", (done) => {
        chai.request(server)
            .options("/looksup")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


describe("/GET opcos", () => {
    it("it should GET all the opcos", (done) => {
        chai.request(server)
            .get("/opcos")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/GET one opco", () => {
    it("it should GET one opco by id", (done) => {
        chai.request(server)
            .get("/opcos/001")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/OPTIONS opcos", () => {
    it("it should GET opcos options", (done) => {
        chai.request(server)
            .options("/opcos")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/GET global settings", () => {
    it("it should GET global settings", (done) => {
        chai.request(server)
            .get("/global-settings")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/PUT global settings", () => {
    it("it should put global settings", (done) => {
        chai.request(server)
            .put("/global-settings")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/POST global settings", () => {
    it("it should post global settings", (done) => {
        chai.request(server)
            .post("/global-settings")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/OPTIONS global settings", () => {
    it("it should get global settings options", (done) => {
        chai.request(server)
            .options("/global-settings")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/GET users", () => {
    it("it should GET all the users", (done) => {
        chai.request(server)
            .get("/users")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/GET one user", () => {
    it("it should GET one user by id", (done) => {
        chai.request(server)
            .get("/users/001")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("data");
                done();
            });
    });
});

describe("/POST users", () => {
    it("it should post new user", (done) => {
        chai.request(server)
            .post("/users")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe("/OPTIONS users", () => {
    it("it should get users options", (done) => {
        chai.request(server)
            .options("/users")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
