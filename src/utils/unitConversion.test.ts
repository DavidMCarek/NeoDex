import { convertDmToFeetInches, convertHgToLbs } from "./unitConversion";

describe("unitConversion", () => {
  describe("convertDmToFeetInches", () => {
    it("should convert 0 dm to feet and inches", () => {
      expect(convertDmToFeetInches(0)).toBe("0 ft 0 in");
    });

    it("should convert 10 dm to feet and inches", () => {
      expect(convertDmToFeetInches(10)).toBe("3 ft 3 in");
    });

    it("should round inches correctly", () => {
      expect(convertDmToFeetInches(12.7)).toBe("4 ft 2 in");
    });
  });

  describe("convertHgToLbs", () => {
    it("should convert 0 hg to pounds", () => {
      expect(convertHgToLbs(0)).toBe("0.00 lbs");
    });

    it("should convert 10 hg to pounds", () => {
      expect(convertHgToLbs(10)).toBe("2.20 lbs");
    });

    it("should round to two decimal places correctly", () => {
      expect(convertHgToLbs(123.45)).toBe("27.22 lbs");
    });
  });
});
