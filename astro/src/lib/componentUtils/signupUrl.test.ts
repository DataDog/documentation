import { describe, expect, it } from "vitest";
import { getSignupUrl } from "./signupUrl";

describe("getSignupUrl", () => {
  // `/signup` sends `frame-ancestors 'self'`, so it can't load in the free
  // trial modal's iframe. `/signup_corp` allows `*.datadoghq.com`, which is
  // what Hugo frames (hugo/assets/scripts/components/signup.js).
  it("uses the embeddable signup_corp page with the page language", () => {
    expect(getSignupUrl("en")).toBe(
      "https://app.datadoghq.com/signup_corp?lang=en",
    );
  });

  it("passes other languages through", () => {
    expect(getSignupUrl("ja")).toBe(
      "https://app.datadoghq.com/signup_corp?lang=ja",
    );
  });
});
