import { MarkdownSlide } from "spectacle";

export function Proposal() {
  return (
    <MarkdownSlide>
{`
# What we want? 🤯

    - I want a multi-step wizard form with each step on its own Next.js page.
    - I want all steps to share one centralized form state.
    - I want navigation buttons below each page to move between steps and submit.
    - I want each step to have its own validation and behavior.
`}
    </MarkdownSlide>
  );
}
