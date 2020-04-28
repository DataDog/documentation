import com.datadog.api.v1.client.api.OrganizationsApi;

public class OrganizationsApiExample {

    public static void main(String[] args) {
        OrganizationsApi apiInstance = new OrganizationsApi();
        String publicId = abc123; // String | The public_id of the org you are operating with
        File idpFile = BINARY_DATA_HERE; // File | The path to the XML metadata file you wish to upload.
        try {
            IdpResponse result = apiInstance.uploadIdPForOrg(publicId, idpFile);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrganizationsApi#uploadIdPForOrg");
            e.printStackTrace();
        }
    }
}