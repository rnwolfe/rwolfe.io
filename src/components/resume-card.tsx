"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  fallbackText?: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  fallbackText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const progressionPrefix = "Progression:";
  let progression: string | null = null;
  let progressionItems: string[] = [];
  let remainder = description || "";

  if (description?.startsWith(progressionPrefix)) {
    const parts = description.split(". ");
    progression = parts[0];
    remainder = parts.slice(1).join(". ").trim();
    const progressionText = progression.replace(progressionPrefix, "").trim();
    progressionItems = progressionText
      .split("->")
      .map((item) => item.trim())
      .filter(Boolean)
      .reverse();
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            {logoUrl ? (
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
            ) : null}
            <AvatarFallback className="text-xs font-semibold">
              {fallbackText || altText[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm"
            >
              {progression ? (
                <div className="relative pl-6">
                  <div className="space-y-2 text-[11px]">
                    {progressionItems.map((item, index) => {
                      const isLatest = index === 0;
                      const position =
                        progressionItems.length > 1
                          ? index / (progressionItems.length - 1)
                          : 0;
                      const intensity = 0.35 + (1 - position) * 0.45;

                      return (
                        <div
                          key={item}
                          className="relative flex items-start gap-2"
                          style={{ color: `hsl(var(--foreground) / ${intensity})` }}
                        >
                          <span className="relative mt-[5px] size-2">
                            <span
                              className={`absolute inset-0 rounded-full ring-2 ring-background ${
                                isLatest ? "bg-foreground/80" : ""
                              }`}
                              style={{
                                backgroundColor: `hsl(var(--foreground) / ${
                                  intensity + 0.15
                                })`,
                              }}
                            />
                            {isLatest ? (
                              <span
                                className="absolute inset-[-3px] rounded-full border border-foreground/40 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"
                                aria-hidden="true"
                              />
                            ) : null}
                          </span>
                          <span className={isLatest ? "font-semibold" : "font-medium"}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {remainder ? (
                <div className={progression ? "mt-2" : undefined}>
                  {remainder}
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
