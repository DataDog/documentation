import com.datadog.api.v2.client.api.RolesApi;

public class RolesApiExample {

    public static void main(String[] args) {
        RolesApi apiInstance = new RolesApi();
        String roleId = roleId_example; // String | The ID of the role.
        try {
            RoleResponse result = apiInstance.getRole(roleId);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RolesApi#getRole");
            e.printStackTrace();
        }
    }
}