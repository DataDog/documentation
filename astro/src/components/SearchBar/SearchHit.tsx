import styles from "./SearchBar.module.css";
import { classListFactory } from "@lib/cssUtils/classListFactory";
import type { NormalizedHit } from "@lib/search/normalize";

const cl = classListFactory(styles);

interface Props {
  hit: NormalizedHit;
  selected: boolean;
}

export default function SearchHit({ hit, selected }: Props) {
  return (
    <li class={cl("search-hit", selected && "search-hit--selected")}>
      <a
        class={cl("search-hit__link")}
        href={hit.url}
        target={hit.isApi ? undefined : "_blank"}
        rel={hit.isApi ? undefined : "noopener noreferrer"}
      >
        <p class={cl("search-hit__subcategory")}>{hit.subcategory}</p>
        <div class={cl("search-hit__body")}>
          <p class={cl("search-hit__title")}>
            <strong dangerouslySetInnerHTML={{ __html: hit.title }} />
            {hit.sectionHeader && (
              <span class={cl("search-hit__section")}>
                {" » "}
                <strong
                  dangerouslySetInnerHTML={{ __html: hit.sectionHeader }}
                />
              </span>
            )}
          </p>
          {hit.snippetHtml && (
            <p
              class={cl("search-hit__snippet")}
              dangerouslySetInnerHTML={{ __html: hit.snippetHtml }}
            />
          )}
        </div>
      </a>
    </li>
  );
}
