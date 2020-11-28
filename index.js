const {MatrixClient, MatrixAuth} = require("matrix-bot-sdk");
const pwgen = require("password-generator");
const options = require("./config.json");

/*
{
    "adminAccessToken": "",
    "realHomeserverUrl": "https://t2bot.io",
    "pantalaimonUrl": "http://localhost:8008",
    "userId": "@example:t2bot.io"
}
*/

const adminClient = new MatrixClient(options["realHomeserverUrl"], options["adminAccessToken"]);
(async function() {
    const newPassword = pwgen(24, false);

    await adminClient.doRequest("POST", "/_synapse/admin/v1/reset_password/" + encodeURIComponent(options["userId"]), null, {
        new_password: newPassword,
        logout_devices: true,
    });

    const newClient = await new MatrixAuth(options["pantalaimonUrl"]).passwordLogin(options["userId"], newPassword);
    console.log("");
    console.log("========================================================================");
    console.log("");
    console.log("User ID: ", options["userId"]);
    console.log("Password: ", newPassword);
    console.log("Access token: ", newClient.accessToken);
})();
