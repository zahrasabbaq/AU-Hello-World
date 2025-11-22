// the two functions work together to turn persian numbers,
// which are a big issue for managing backend,
// into english numbers to have a better consistency in the database

const PersianNumberToEnglish = (s: any): any => {
  if (typeof s !== "string") return s;

  const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

  return s.replace(/[۰-۹٠-٩]/g, (d) => {
    let idx = persianDigits.indexOf(d);
    if (idx === -1) idx = arabicDigits.indexOf(d);
    return idx > -1 ? String(idx) : d;
  });
};

function ObjectNumbersToEnglish(obj: any) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = value.map((v) => {
        if (v && typeof v === "object" && !Array.isArray(v)) {
          return ObjectNumbersToEnglish(v);
        } else if (typeof v === "string") {
          return PersianNumberToEnglish(v);
        } else {
          return v;
        }
      });
    } else if (typeof value === "undefined") {
      return acc;
    } else if (typeof value === "string") {
      acc[key] = PersianNumberToEnglish(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      acc[key] = ObjectNumbersToEnglish(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}
