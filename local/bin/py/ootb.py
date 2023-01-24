#!/usr/bin/env python3

from assetlib.asset_library import validate
from assetlib.validation import BaseAssetValidator


class MyValidatorClass(BaseAssetValidator):
    def get_asset_type(self):  # type: () -> Text
        """Unique string describing the asset type that this class validates."""
        return 'foo'

    def handle_manifest(self, collection, manifest):  # type: (LibraryCollection, Manifest) -> None
        """Called once for each manfest file in the library"""
        print(manifest)

    def should_handle_asset(self, collection, file_path):  # type: (LibraryCollection, Text) -> bool
        """Called once for each asset file in the library.
        If this method returns True, the asset file will be loaded into memory from S3
        and passed to the handle_asset method below.
        """
        return True if file_path.endswith('.md') else False

    def handle_asset(self, collection, file_path, asset):  # type: (LibraryCollection, Text, bytes) -> None
        """Called if should_handle_asset returned True for that asset."""
        print(file_path)

    def get_asset_errors(self):  # type: () -> List[AssetError]
        """Called at the end of the validation run to fetch asset-specific errors."""
        print("errors")


#validation_results = validate("dd-asset-library-pull-requests", "9afda94a0de5cffe5db006894eacb3f079765e82", validator_klasses=[MyValidatorClass])
validation_results = validate("dd-asset-library-live", "libraries/8d0950e6-4b1e-4e48-9109-31bb8369a49c")
