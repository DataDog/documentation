export type DbData = {
  allowlist: {
    prefsById: Record<
      string,
      {
        id: string;
        display_name: string;
        description?: string;
      }
    >;
    optionsById: Record<
      string,
      {
        id: string;
        display_name: string;
      }
    >;
  };
};
