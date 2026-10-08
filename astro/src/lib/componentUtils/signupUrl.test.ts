import { describe, expect, it } from "vitest";
import { getSignupUrl } from "./signupUrl";

describe("getSignupUrl", () => {
  // Visited directly, not framed, so it's the regular sign-up page rather than
  // the embeddable `/signup_corp`.
  it("returns the top-level sign-up page", () => {
    expect(getSignupUrl()).toBe("https://app.datadoghq.com/signup");
  });
});
