package lecture03;

public class PrimitiveStringType {
  public static void comparePlainCharacters() {
    char origin = '-';
    char target = '-';
    
    // true
    System.out.println(origin == target);
  }

  public static void compareArrayCharacters() {
    char[] origin = new char[1];
    char[] target = new char[1];

    origin[0] = '-';
    target[0] = '-';
    
    // false : Array is a reference type, not a primitive type.
    System.out.println(origin == target);

    // false : Array is a reference type, not a primitive type.
    System.out.println(origin.equals(target));

    // true : The address of "origin[0]" value and the address of "target[0]" value are the same.
    System.out.println(origin[0] == target[0]);

    String originString = new String(origin);
    String targetString = new String(target);

    // false : "==" compares the address values of "origin" and "target".
    System.out.println(originString == targetString);

    // true : "equals" method compares the values of "origin" and "target".
    System.out.println(originString.equals(targetString));
  }

  public static void comparePlainStrings() {
    String origin = "String";
    String target = "String";

    // true
    System.out.println(origin == target);

    // true
    System.out.println(origin.equals(target));
  }

  public static void compareArrayCharacterAndString() {
    
    char[] charArray = {'S', 't', 'r', 'i', 'n', 'g'};
    String stringFromCharArray = new String(charArray);
    String targetString = "String";

    // true
    System.out.println(stringFromCharArray.equals(targetString));
  }

  public static void main(String[] argv) {
    comparePlainCharacters();
    compareArrayCharacters();
    comparePlainStrings();
    compareArrayCharacterAndString();
  }
}