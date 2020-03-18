import com.datadog.api.v1.client.api.OrgsApi;

public class OrgsApiExample {

    public static void main(String[] args) {
        OrgsApi apiInstance = new OrgsApi();
        String publicId = abc123; // String | The public_id of the org you are operating with
        File idpFile = BINARY_DATA_HERE; // File | The path to the XML metadata file you wish to upload.
        try {
            IdpResponse result = apiInstance.uploadIdPForOrg(publicId, idpFile);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling OrgsApi#uploadIdPForOrg");
            e.printStackTrace();
        }
    }
}