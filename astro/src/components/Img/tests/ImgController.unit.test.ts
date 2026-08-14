// @vitest-environment happy-dom
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import { h } from "preact";
import type { ComponentType } from "preact";
import ImgController from "../ImgController";

const ImgControllerComponent = ImgController as ComponentType<any>;

const baseProps = {
  imageUrl: "/images/content/example.png",
  srcset: "/images/content/example.png",
  popupHref: "/images/content/example.png?fit=max&auto=format",
};

const renderImgController = (props: Record<string, unknown> = {}) =>
  render(h(ImgControllerComponent, { ...baseProps, ...props }));

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("ImgController — rendering", () => {
  it("renders a figure-wrapped image by default", () => {
    const { container } = renderImgController({ alt: "CI/CD Health dashboard" });

    expect(container.querySelector(".img__figure")).not.toBeNull();
    const image = container.querySelector("img.img__image");
    expect(image).not.toBeNull();
    expect(image?.getAttribute("alt")).toBe("CI/CD Health dashboard");
  });

  it("wraps the image in a popup link by default", () => {
    const { container } = renderImgController();

    const link = container.querySelector("a.img__link--popup");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe(baseProps.popupHref);
  });

  it("omits the popup link when popup is false", () => {
    const { container } = renderImgController({ popup: false });

    expect(container.querySelector(".img__link--popup")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
  });

  it("renders a figcaption when caption is set", () => {
    const { container } = renderImgController({ caption: "Example caption" });

    const figcaption = container.querySelector("figcaption");
    expect(figcaption).not.toBeNull();
    expect(figcaption?.textContent).toBe("Example caption");
  });

  it("omits the figcaption when caption is not set", () => {
    const { container } = renderImgController();

    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("renders a bare inline img with no figure or popup", () => {
    const { container } = renderImgController({ inline: true, width: "22" });

    expect(container.querySelector(".img__figure")).toBeNull();
    expect(container.querySelector("figure")).toBeNull();
    expect(container.querySelector("a")).toBeNull();
    const image = container.querySelector("img");
    expect(image).not.toBeNull();
    expect(image?.getAttribute("width")).toBe("22");
  });

  it("applies widthPercent as an inline width style on the rendered image", () => {
    const { container } = renderImgController({ widthPercent: 40 });

    const image = container.querySelector("img.img__image") as HTMLElement;
    expect(image.style.width).toBe("40%");
  });

  it("omits the style attribute when widthPercent is not set", () => {
    const { container } = renderImgController();

    const image = container.querySelector("img.img__image")!;
    expect(image.hasAttribute("style")).toBe(false);
  });
});

describe("ImgController — opening via its own trigger", () => {
  it("opens the overlay with the full-size image when the popup link is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController({ alt: "An example screenshot" });

    const trigger = container.querySelector("a.img__link--popup")!;
    await user.click(trigger);

    const overlay = container.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(false);
    expect(overlay.getAttribute("aria-hidden")).toBe("false");

    const lightboxImage = overlay.querySelector("img");
    expect(lightboxImage?.getAttribute("src")).toBe(baseProps.popupHref);
    expect(lightboxImage?.getAttribute("alt")).toBe("An example screenshot");
  });

  it("prevents the default navigation on the trigger link", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController();

    const trigger = container.querySelector("a.img__link--popup")!;
    await user.click(trigger);

    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    trigger.dispatchEvent(clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });

  it("shows the caption in the lightbox when one is set", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController({ caption: "Example caption text" });

    const trigger = container.querySelector("a.img__link--popup")!;
    await user.click(trigger);

    const overlay = container.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.textContent).toContain("Example caption text");
  });

  it("renders no overlay content before the trigger is clicked", () => {
    const { container } = renderImgController();

    const overlay = container.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(true);
    expect(overlay.querySelector("img")).toBeNull();
  });

  it("never renders a close button", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController();

    const trigger = container.querySelector("a.img__link--popup")!;
    await user.click(trigger);

    const overlay = container.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.querySelector("button")).toBeNull();
  });
});

describe("ImgController — closing", () => {
  async function openLightbox(
    user: ReturnType<typeof userEvent.setup>,
    container: HTMLElement,
  ) {
    const trigger = container.querySelector("a.img__link--popup")!;
    await user.click(trigger);
  }

  it("closes on Escape keypress and clears displayed image state", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController();
    await openLightbox(user, container);

    const overlay = container.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    expect(overlay.hasAttribute("hidden")).toBe(false);

    await user.keyboard("{Escape}");

    expect(overlay.hasAttribute("hidden")).toBe(true);
    expect(overlay.querySelector("img")).toBeNull();
  });

  it("closes on backdrop click but stays open when the dialog itself is clicked", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController();
    await openLightbox(user, container);

    const overlay = container.querySelector<HTMLElement>(".img-lightbox__overlay")!;
    const dialog = overlay.querySelector(".img-lightbox__dialog") as HTMLElement;
    expect(dialog).not.toBeNull();

    await user.click(dialog);
    expect(overlay.hasAttribute("hidden")).toBe(false);

    await user.click(overlay);
    expect(overlay.hasAttribute("hidden")).toBe(true);
  });
});

describe("ImgController — body scroll lock", () => {
  it("locks body scroll while open and releases it on close", async () => {
    const user = userEvent.setup();
    const { container } = renderImgController();

    expect(document.body.style.overflow).toBe("");

    const trigger = container.querySelector("a.img__link--popup")!;
    await user.click(trigger);

    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    expect(document.body.style.overflow).toBe("");
  });
});
