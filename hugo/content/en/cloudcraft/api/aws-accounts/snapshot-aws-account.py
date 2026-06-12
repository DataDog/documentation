from cloudcraftco import Cloudcraft

cloudcraft = Cloudcraft()

account_id = 1234
options = {"grid": True, "scale": 1.5}
region = "us-east-1"
file_format = "png"
snapshot = cloudcraft.snapshot_aws_account(account_id, region, file_format, options)
with open(f'snapshot.{file_format}', "wb") as binary_file:
    binary_file.write(snapshot)
