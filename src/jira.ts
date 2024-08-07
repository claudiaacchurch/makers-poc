import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

type JiraComment = {
  author: { displayName: string };
  created: string;
  body: string;
}

type JiraAttachment = {
  filename: string;
  content: string;
}

type JiraField = {
  summary: string;
  description: string;
  status: { name: string };
  assignee: { displayName: string } | null;
  comment: { comments: JiraComment[] };
  attachment: JiraAttachment[];
}

type JiraIssue = {
  key: string;
  fields: JiraField;
}

const jiraUrl = process.env.JIRA_URL;
const email = process.env.PERSONAL_EMAIL;
const apiToken = process.env.JIRA_API_TOKEN;
const issueKey = 'APOLLO-2154';

const formatAndPrintIssueDetails = (issue: JiraIssue) => {
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
    const response = await axios.get(`${jiraUrl}/rest/api/2/issue/${issueKey}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`,
      }
    });

    const data = response.data as JiraIssue;
    formatAndPrintIssueDetails(data);
};

getIssueDetails();