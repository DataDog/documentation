import com.datadog.api.v2.client.api.RolesApi;

public class RolesApiExample {

    public static void main(String[] args) {
        RolesApi apiInstance = new RolesApi();
        String roleId = roleId_example; // String | The ID of the role.
        RelationshipToPermission body = ; // RelationshipToPermission | 
        try {
            PermissionsResponse result = apiInstance.addPermissionToRole(roleId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RolesApi#addPermissionToRole");
            e.printStackTrace();
        }
    }
}