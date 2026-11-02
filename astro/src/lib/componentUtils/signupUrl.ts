/**
 * Where GET STARTED FREE sends visitors. Hugo instead opens a sign-up modal
 * that frames `/signup_corp` (hugo/assets/scripts/components/signup.js); that
 * work is tracked in WEB-10305.
 */
export function getSignupUrl(): string {
  return "https://app.datadoghq.com/signup";
}
