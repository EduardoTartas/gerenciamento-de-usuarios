"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.teste3 = exports.teste2 = exports.teste1 = void 0;
const role = __importStar(require("../services/roleServices"));
const users = __importStar(require("./../services/userServices"));
/*export const teste1 = new users.Users("teste", "teste@teste.com", "123teste" , role.admRole);
export const teste2 = new users.Users("teste", "teste@teste.com", "123teste" , role.admRole);
export const teste3 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste4 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste5 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste6 = new users.Users("teste", "teste@teste.com", "123teste" , role.guestRole);
export const teste7 = new users.Users("teste", "teste@teste.com", "123teste" , role.profRole);
export const teste8 = new users.Users("teste", "teste@teste.com", "123teste" , role.profRole);
export const teste9 = new users.Users("teste", "teste@teste.com", "123teste" , role.profRole);

users.users.push(teste1)*/
exports.teste1 = new users.Users("teste", "teste@teste.com", "123teste", role.admRole);
exports.teste2 = new users.Users("teste2", "teste@teste.com", "123teste", role.guestRole);
exports.teste3 = new users.Users("teste3", "teste@teste.com", "123teste", role.profRole);
exports.teste1.id = "123";
users.users.push(exports.teste1, exports.teste2, exports.teste3);
