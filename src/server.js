"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
    }
    routes() {
    }
    start() {
        this.app.listen(this.app.get('port', () => {
            console.log(`server listening on port ${this.app.get('port')}`);
        }));
    }
}
const server = new Server();
server.start();
