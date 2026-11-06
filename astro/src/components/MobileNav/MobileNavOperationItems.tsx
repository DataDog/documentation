import styles from "./MobileNav.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import type { MobileNavOperation } from "@lib/api/mobileNavData";

const cl = classListFactory(styles);

interface Props {
  /** The category landing page's localized href, with a trailing slash. */
  categoryHref: string;
  operations: MobileNavOperation[];
  /** Marks this operation as the current page. */
  activeOperationSlug?: string;
}

/**
 * One API category's operation links in the mobile nav. Rendered statically
 * (no `client:` directive) by `MobileNavApiList` for the active category, and
 * rendered on the client by `MobileNavApiListLoader` for any other category
 * the user expands, so both paths produce identical markup.
 */
export default function MobileNavOperationItems({
  categoryHref,
  operations,
  activeOperationSlug,
}: Props) {
  return (
    <>
      {operations.map((operation) => {
        const isActiveOperation = operation.slug === activeOperationSlug;
        return (
          <li key={operation.slug}>
            <a
              href={`${categoryHref}${operation.slug}/`}
              class={cl(
                "mobile-nav__link",
                "mobile-nav__link--compact",
                isActiveOperation && "mobile-nav__link--active",
              )}
              data-level="1"
              style="--depth:1"
              aria-current={isActiveOperation ? "page" : undefined}
            >
              {operation.summary}
            </a>
          </li>
        );
      })}
    </>
  );
}
