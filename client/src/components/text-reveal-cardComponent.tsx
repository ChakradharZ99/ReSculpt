"use client";
import {
  TextRevealCard,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export function TextRevealCardPreview({title, text, revealText}:{title: string, text: string, revealText: string}) {
  return (
    <div className="flex items-center justify-center rounded-2xl">
      <TextRevealCard
        text={text}
        revealText={revealText}
      >
        <TextRevealCardTitle>
          {title}
        </TextRevealCardTitle>
      </TextRevealCard>
    </div>
  );
}
