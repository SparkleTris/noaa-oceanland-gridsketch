import pandas as pd
import json

def parse_noaa_file(file):
    # read the file
    noaa_df = pd.read_csv(file, dtype = {'Year': str, 'Anomaly': float})
    
    noaa_df['new_year'] = noaa_df.Year.str[:4]
    noaa_df['month'] = noaa_df.Year.str[4:6].astype(int)

    print(noaa_df.describe())

    return noaa_df

# Main function
def main():
    ##forexport = parse_noaa_file("../data/GlobalAnomalies-LandAndOcean-1963-2023-Monthly.csv")
    ##forexport = parse_noaa_file("../data/GlobalAnomalies-Ocean-1963-2023-Monthly.csv")
    forexport = parse_noaa_file("../data/GlobalAnomalies-Land-1963-2023-Monthly.csv")

    noaa_list = []

    for k, row in forexport.iterrows():
        noaa_dict = {}
        noaa_dict["year"] = row["new_year"]
        noaa_dict["month"] = row["month"]
        noaa_dict["anomaly"] = row["Anomaly"]

        noaa_list.append(noaa_dict)

    with open("noaa_globalanomalies_land_1963-2023.json", 'w+') as fileToSave:
        json.dump(noaa_list, fileToSave, ensure_ascii=True, indent=4, sort_keys=True)

# __name__
if __name__ == "__main__":
    main()