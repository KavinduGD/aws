## S3 (Simple Storage Service)

### Bucket can be public or private

- private bucket - Only the AWS account owner or authorized users can access it.
- public bucket - Anyone on the internet can access it.

### objects can be public or private

- private object - Only the AWS account owner or authorized users can access it.
- public object - Anyone on the internet can access it.

### To host a static website on S3

- Bucket need to public
- Objects need to be public

### S3 public access

- Uncheck Block Public Access
- This is not enough, you also need to set bucket policy or object ACL to public

### Storage class is assigned to objects, not buckets

- Standard
- Intelligent-Tiering
- One Zone-IA
- Glacier
- Glacier Deep Archive

### S3 service is Region specific

### S3 is a flat structure, no folders

### S3 versioning

- S3 Versioning keeps multiple versions of the same object in a bucket, helping you recover old files if someone overwrites or deletes a file.
- Uploading a file with same name replaces the old file. With versioning s3 keep both files with different versions
- With versioning enabled, deleting a file will not remove it, instead it will add a delete marker to the object
