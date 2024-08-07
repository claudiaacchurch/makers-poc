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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const jiraUrl = process.env.JIRA_URL;
const email = process.env.PERSONAL_EMAIL;
const apiToken = process.env.JIRA_API_TOKEN;
const issueKey = 'APOLLO-2154';
const formatAndPrintIssueDetails = (issue) => {
    console.log('Issue Details:');
    console.log(`- Key: ${issue.key}`);
    console.log(`- Summary: ${issue.fields.summary}`);
    console.log(`- Description: ${issue.fields.description}`);
    console.log(`- Status: ${issue.fields.status.name}`);
    console.log(`- Assignee: ${issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned'}`);
    console.log(`- Comments:`);
    issue.fields.comment.comments.forEach((comment, index) => {
        console.log(`  ${index + 1}. ${comment.author.displayName} (${comment.created}): ${comment.body}`);
    });
    console.log('- Attachments:');
    issue.fields.attachment.forEach((attachment, index) => {
        console.log(`  ${index + 1}. ${attachment.filename} (URL: ${attachment.content})`);
    });
};
const getIssueDetails = async () => {
    const response = await axios_1.default.get(`${jiraUrl}/rest/api/2/issue/${issueKey}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
        }
    });
    const data = response.data;
    formatAndPrintIssueDetails(data);
};
getIssueDetails();
