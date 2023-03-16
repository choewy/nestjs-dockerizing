package lecture03;

public class PrimitiveNumberType {

  public static void printShortRange() {
    // -32768
    System.out.println(Short.MIN_VALUE);

    // 32767
    System.out.println(Short.MAX_VALUE);
  }

  public static void printIntRange() {
    // -2147483648
    System.out.println(Integer.MIN_VALUE);

    // 2147483647
    System.out.println(Integer.MAX_VALUE);
  }

  public static void printLongRange() {
    // -9223372036854775808
    System.out.println(Long.MIN_VALUE);

    // 9223372036854775807
    System.out.println(Long.MAX_VALUE);
  }

  public static void printFloatRange() {
    // 1.4E-45
    System.out.println(Float.MIN_VALUE);

    // 3.4028235E38
    System.out.println(Float.MAX_VALUE);
  }

  public static void printDoubleRange() {
    // 4.9E-324
    System.out.println(Double.MIN_VALUE);

    // 1.7976931348623157E308
    System.out.println(Double.MAX_VALUE);
  }

  public static void main(String[] args) {
    printShortRange();
    printIntRange();
    printLongRange();
    printFloatRange();
    printDoubleRange();
  }
}