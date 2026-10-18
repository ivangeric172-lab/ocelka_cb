package org.example;

public enum Material {
    OCEL_1_4301("1.4301"),
    OCEL_1_4404("1.4404");

    private final String markovanie;

    private Material(String markovanie){
        this.markovanie = markovanie;
    }

    public String getMarkovanie() {
        return markovanie;
    }

}
