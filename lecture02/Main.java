package lecture02;

public class Main {
  public static void main(String[] args) {
    int num = 0;
    num += 1;
    System.out.println(num);
    
    String string = "Hello";
    string += " World!";
    System.out.println(string);
  
    final int NUM = 0;
    // NUM += 1; (fail)
    System.out.println(NUM);

    final String STRING = "Hello";
    // STRING += " World!"; (fail) 
    System.out.println(STRING);
  }
}
