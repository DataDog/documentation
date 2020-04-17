import com.datadog.api.v2.client.api.RolesApi;

public class RolesApiExample {

    public static void main(String[] args) {
        RolesApi apiInstance = new RolesApi();
        String roleId = roleId_example; // String | The ID of the role.
        try {
            apiInstance.deleteRole(roleId);
        } catch (ApiException e) {
            System.err.println("Exception when calling RolesApi#deleteRole");
            e.printStackTrace();
        }
    }
}