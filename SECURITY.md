# Credential review for the maintained deployment

The current tracked frontend and backend source no longer contain the private Firebase service-account JSON that was present in their initial commits. The maintained backend verifies Firebase ID tokens using public certificates and project configuration; it does not use a private service-account key.

## Historical credential: revocation not yet verified

The initial histories of `WorldDevFront` and `WorldDevBack` contain a service-account key for the separate legacy Firebase project `world-developer-f5a6e`. Removing the file from the current source does not revoke that key. Its current status cannot be established from Git history.

A project owner must inspect the service account in that legacy project's IAM service-account key settings and revoke the exposed key if it still exists. Do not test or reuse the historical credential. Do not publish the key material in an issue, log or screenshot. Record completion here only after verifying the credential status in the owning Google Cloud project.

The current deployment uses the distinct Firebase project `world-developer`. Do not delete that project, its user accounts, or unrelated keys as part of the legacy-key review.
