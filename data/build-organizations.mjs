/**
 * Build data/organizations.json (v1 directory schema).
 * Sources: official .gov and agency sites; AFWA state agency index
 *   https://www.fishwildlife.org/ (state directory); NOAA fisheries.noaa.gov;
 *   USFWS, BLM, NPS, USFS, state portals where linked from agency home pages.
 * last_verified: 2026-04-22
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "organizations.json");
const v = "2026-04-22";

const NOAA = {
  AL: "southeast",
  AK: "alaska",
  AZ: "west_coast",
  AR: "southeast",
  CA: "west_coast",
  CO: "west_coast",
  CT: "greater_atlantic",
  DE: "greater_atlantic",
  DC: "greater_atlantic",
  FL: "southeast",
  GA: "southeast",
  HI: "pacific_islands",
  ID: "west_coast",
  IL: "greater_atlantic",
  IN: "greater_atlantic",
  IA: "southeast",
  KS: "southeast",
  KY: "southeast",
  LA: "southeast",
  ME: "greater_atlantic",
  MD: "greater_atlantic",
  MA: "greater_atlantic",
  MI: "greater_atlantic",
  MN: "greater_atlantic",
  MS: "southeast",
  MO: "southeast",
  MT: "west_coast",
  NE: "southeast",
  NV: "west_coast",
  NH: "greater_atlantic",
  NJ: "greater_atlantic",
  NM: "southeast",
  NY: "greater_atlantic",
  NC: "southeast",
  ND: "west_coast",
  OH: "greater_atlantic",
  OK: "southeast",
  OR: "west_coast",
  PA: "greater_atlantic",
  PR: "southeast",
  RI: "greater_atlantic",
  SC: "southeast",
  SD: "west_coast",
  TN: "southeast",
  TX: "southeast",
  UT: "west_coast",
  VT: "greater_atlantic",
  VA: "greater_atlantic",
  WA: "west_coast",
  WV: "greater_atlantic",
  WI: "greater_atlantic",
  WY: "west_coast"
};

/** U.S. state/territory natural resource or fish & wildlife lead agency. */
const stateAgencyRows = [
  ["alabama-dcnr", "AL", "Alabama Department of Conservation and Natural Resources", "https://www.outdooralabama.com/", "https://www.outdooralabama.com/", "The lead state agency in Alabama for conservation of fish, game, and aquatic and terrestrial habitats, including public lands, hunting and fishing, and law enforcement on natural resources."],
  ["alaska-dfg", "AK", "Alaska Department of Fish and Game", "https://www.adfg.alaska.gov/", "https://www.careers.adfg.alaska.gov/", "Alaska’s principal state agency for science-based management, research, and regulation of the state’s fish and wildlife, including commercial and subsistence fisheries and enforcement."],
  ["arizona-azgfd", "AZ", "Arizona Game and Fish Department", "https://www.azgfd.com/", "https://www.azgfd.com/careers/", "State agency responsible for managing Arizona’s wildlife and fisheries, habitat conservation, and outdoor recreation, including public hunting, fishing, and law enforcement in service of the state’s wildlife and aquatic resources."],
  ["arkansas-agfc", "AR", "Arkansas Game and Fish Commission", "https://www.agfc.com/", "https://www.agfc.com/employment/", "State commission that manages and conserves fish and wildlife and their habitats in Arkansas through regulations, public land management, and science-driven restoration."],
  ["california-cdfw", "CA", "California Department of Fish and Wildlife", "https://wildlife.ca.gov/", "https://wildlife.ca.gov/Employment", "California’s primary agency for the conservation, protection, and management of fish, wildlife, and native plants and for sustainable use of the state’s water-related natural resources and habitats."],
  ["colorado-cpw", "CO", "Colorado Parks and Wildlife", "https://cpw.state.co.us/", "https://cpw.state.co.us/aboutus/Pages/Employment.aspx", "State agency that manages fish and wildlife, state parks, and outdoor recreation in Colorado, combining biological science, habitat stewardship, and public trust resource management on behalf of the people of Colorado."],
  ["connecticut-deep-fw", "CT", "Connecticut Department of Energy and Environmental Protection (Wildlife & Fisheries)", "https://portal.ct.gov/deep", "https://portal.ct.gov/deep/about/employment--internships/employment--internships", "State agency (DEEP) that protects air, water, and natural resources, including the Bureau of Natural Resources’ fish and wildlife programs, habitat protection, and outdoor recreation in Connecticut."],
  ["delaware-dnrec-fw", "DE", "Delaware Department of Natural Resources and Environmental Control (Fish & Wildlife)", "https://dnrec.delaware.gov/fw/", "https://dnrec.delaware.gov/work-here", "State agency for Delaware’s environment and natural resources, including fish and wildlife conservation, public lands, and recreational fisheries and hunting programs."],
  ["florida-fwc", "FL", "Florida Fish and Wildlife Conservation Commission", "https://myfwc.com/", "https://myfwc.com/get-involved/employment", "State commission that manages and regulates Florida’s fish and wildlife, balancing conservation, law enforcement, and public use of the state’s diverse natural resources in coastal and inland systems."],
  ["georgia-dnr", "GA", "Georgia Department of Natural Resources (Wildlife Resources Division)", "https://gadnr.org/", "https://gadnr.org/employment", "State agency for wildlife, fisheries, state parks, and coastal management in Georgia, including public hunting, fishing, and habitat and species management."],
  ["hawaii-dofaw", "HI", "Hawaii Department of Land and Natural Resources (Division of Forestry and Wildlife)", "https://dlnr.hawaii.gov/dofaw/", "https://dlnr.hawaii.gov/jobs/", "State division responsible for the conservation, management, and protection of native species and ecosystems and public hunting and other programs on forest reserves and public lands in Hawaii."],
  ["idaho-idfg", "ID", "Idaho Department of Fish and Game", "https://idfg.idaho.gov/", "https://idfg.idaho.gov/job-opportunities", "Idaho’s lead agency for the conservation, restoration, and sustainable use of the state’s fish, wildlife, and their habitats, including public hunting, fishing, and field science."],
  ["illinois-dnr", "IL", "Illinois Department of Natural Resources", "https://www.illinois.gov/dnr", "https://www2.illinois.gov/dnr/employmentopportunities/Pages/default.aspx", "State DNR for Illinois’ land, water, and wildlife, including state parks, conservation police, and fisheries and wildlife management across the state’s diverse ecosystems."],
  ["indiana-dnr", "IN", "Indiana Department of Natural Resources", "https://www.in.gov/dnr/", "https://www.in.gov/dnr/employment-internships/employment", "State agency for Indiana’s public lands, fish and wildlife, and outdoor recreation, including the Division of Fish and Wildlife and conservation law enforcement."],
  ["iowa-dnr", "IA", "Iowa Department of Natural Resources", "https://www.iowadnr.gov/", "https://www.iowadnr.gov/About-DNR/Employment-Internships/How-to-Apply", "Iowa DNR’s mission includes fish and wildlife management, state parks, water quality, and natural resource management with science and public access programs on behalf of the people of Iowa."],
  ["kansas-wpw", "KS", "Kansas Department of Wildlife, Parks and Tourism (Wildlife, Fisheries, and Boating)", "https://ksoutdoors.com/", "https://ksoutdoors.com/Jobs-About-Us", "Kansas’ lead agency for wildlife and fisheries resources, public lands, and outdoor recreation, including research, public hunting, fishing, and habitat programs."],
  ["kentucky-dfw", "KY", "Kentucky Department of Fish and Wildlife Resources", "https://fw.ky.gov/", "https://fw.ky.gov/About/Employment", "State agency for conservation, restoration, and responsible use of Kentucky’s fish, wildlife, and their habitats, including law enforcement, public access, and agency lands."],
  ["louisiana-ldwf", "LA", "Louisiana Department of Wildlife and Fisheries", "https://www.wlf.louisiana.gov/", "https://www.civilservice.louisiana.gov/employment-ops/", "Louisiana’s agency for the conservation, protection, and management of the state’s fish, wildlife, and outdoors resources, including commercial and recreational fisheries and coastal and inland management."],
  ["maine-ifw", "ME", "Maine Department of Inland Fisheries and Wildlife", "https://www.mefishwildlife.com/", "https://www.mefishwildlife.com/about/employment", "State agency for Maine’s inland fisheries, wildlife, and habitat, including research, public hunting and angling, and landowner relations for fish and game conservation in the state’s large rural landscape."],
  ["maryland-dnr", "MD", "Maryland Department of Natural Resources (Wildlife and Heritage Service)", "https://dnr.maryland.gov/", "https://dnr.maryland.gov/Pages/employment-volunteer.aspx", "State DNR for Maryland’s public lands, fisheries, wildlife, and Chesapeake natural resources, including restoration, public access, and law enforcement in support of the state’s trust resources."],
  ["massachusetts-mdfg", "MA", "Massachusetts Division of Fisheries and Wildlife", "https://www.mass.gov/orgs/division-of-fisheries-and-wildlife", "https://www.mass.gov/orgs/division-of-fisheries-and-wildlife#work-with-us", "State division that manages the conservation of the Commonwealth’s fish, wildlife, and their habitats, including public hunting, fishing, and species recovery on behalf of the people of Massachusetts."],
  ["michigan-dnr", "MI", "Michigan Department of Natural Resources", "https://www.michigan.gov/dnr", "https://www.michigan.gov/dnr/employment", "Michigan DNR’s mission includes the stewardship of state public lands, waters, and wildlife, including state parks, fisheries, wildlife, and law enforcement in support of the state’s natural resource legacy."],
  ["minnesota-dnr", "MN", "Minnesota Department of Natural Resources", "https://www.dnr.state.mn.us/", "https://www.dnr.state.mn.us/jobs/index.html", "State agency for Minnesota’s fish, wildlife, state lands, and outdoor recreation, including large-scale public land, lake, and river stewardship and public trust services."],
  ["mississippi-mdwfp", "MS", "Mississippi Department of Wildlife, Fisheries, and Parks", "https://www.mdwfp.com/", "https://www.mdwfp.com/employment", "State agency for Mississippi’s fish, wildlife, state parks, and outdoor recreation, including public hunting, fishing, and conservation law enforcement in support of the state’s natural resources."],
  ["missouri-mdc", "MO", "Missouri Department of Conservation", "https://mdc.mo.gov/", "https://mdc.mo.gov/careers", "Missouri’s conservation department dedicated to the protection, conservation, and wise use of the state’s fish, wildlife, and forest resources through science, field programs, and public access."],
  ["montana-fwp", "MT", "Montana Fish, Wildlife & Parks", "https://fwp.mt.gov/", "https://fwp.mt.gov/careers", "State agency for Montana’s fish, wildlife, state parks, and outdoor culture, with broad responsibilities for public lands, hunting, fishing, and natural resource law enforcement in the Northern Rockies."],
  ["nebraska-negf", "NE", "Nebraska Game and Parks Commission", "https://outdoornebraska.gov/", "https://outdoornebraska.gov/employment", "State commission that conserves, enhances, and promotes Nebraska’s fish, wildlife, and outdoor recreation, including public lands, parks, and field science across the state’s ecosystems."],
  ["nevada-ndow", "NV", "Nevada Department of Wildlife", "https://www.ndow.org/", "https://www.ndow.org/about-ndow/careers", "Nevada’s primary agency for the conservation, protection, and management of the state’s fish, wildlife, and their habitats, including public hunting, fishing, and arid-lands wildlife programs."],
  ["new-hampshire-nhfish", "NH", "New Hampshire Fish and Game Department", "https://www.wildnh.com/", "https://www.wildnh.com/employment/employmentopportunities.html", "State agency for the conservation, management, and protection of New Hampshire’s fish, wildlife, and marine resources, including law enforcement, public access, and habitat work."],
  ["new-jersey-njdep-fw", "NJ", "New Jersey Department of Environmental Protection (Fish and Wildlife)", "https://dep.nj.gov/njfw/index/", "https://dep.nj.gov/employment/", "State DEP’s Division of Fish and Wildlife manages the conservation of New Jersey’s fish, wildlife, and their habitats, including regulatory programs, research, and public angling and hunting in a densely developed state."],
  ["new-mexico-nmfd", "NM", "New Mexico Department of Game and Fish", "https://www.wildlife.state.nm.us/", "https://www.wildlife.state.nm.us/employment/", "State department that conserves, protects, and enhances New Mexico’s fish and wildlife, including public land programs, arid-lands and riverine habitat management, and public hunting and fishing."],
  ["new-york-nydec", "NY", "New York State Department of Environmental Conservation", "https://www.dec.ny.gov/", "https://www.dec.ny.gov/jobs/190.html", "State DEC is New York’s lead environmental agency, with broad authority over fish and wildlife, lands and forests, water, and the conservation and sustainable use of the state’s natural resources."],
  ["north-carolina-ncwrc", "NC", "North Carolina Wildlife Resources Commission", "https://www.ncwildlife.org/", "https://www.ncwildlife.org/work-with-us", "State commission that conserves, protects, and sustains the state’s fish, wildlife, and their habitats, including public access, public lands, and wildlife law enforcement in North Carolina."],
  ["north-dakota-ndgp", "ND", "North Dakota Game and Fish Department", "https://gf.nd.gov/", "https://gf.nd.gov/employment", "State agency for North Dakota’s fish, wildlife, and public hunting and angling, including private-lands partnerships, habitat, and public trust management on the Great Plains and Prairie Pothole Region."],
  ["ohio-ohiodnr", "OH", "Ohio Department of Natural Resources (Division of Wildlife)", "https://ohiodnr.gov/", "https://ohiodnr.gov/employment/employmentopportunities", "Ohio DNR’s portfolio includes the Division of Wildlife and conservation of the state’s fish, wildlife, public lands, and waters, with science, public access, and law enforcement programs."],
  ["oklahoma-odwc", "OK", "Oklahoma Department of Wildlife Conservation", "https://www.wildlifedepartment.com/", "https://www.wildlifedepartment.com/career-opportunities", "State department that conserves, protects, and enhances Oklahoma’s fish, wildlife, and their habitats, including public trust resources, public hunting and fishing, and agency land management."],
  ["oregon-odfw", "OR", "Oregon Department of Fish and Wildlife", "https://www.dfw.state.or.us/", "https://www.dfw.state.or.us/agency/employment", "Oregon’s lead state agency for the conservation, protection, and management of the state’s fish, wildlife, and their habitats, including anadromous fish, public lands, and public engagement."],
  ["pennsylvania-pgc", "PA", "Pennsylvania Game Commission", "https://www.pgc.pa.gov/", "https://www.pgc.pa.gov/employment", "State commission for Pennsylvania’s game animals, furbearers, and their habitats, with extensive field programs, law enforcement, and science for wildlife conservation on the Commonwealth’s mixed landscapes."],
  ["puerto-rico-drnpr", "PR", "Puerto Rico Department of Natural and Environmental Resources", "https://www.drn.pr.gov/", "https://www.drn.pr.gov/empleo/", "Insular lead agency for Puerto Rico’s natural resources, protected areas, and environmental stewardship, including coastal and terrestrial conservation under federal and territorial frameworks."],
  ["rhode-island-dem", "RI", "Rhode Island Department of Environmental Management (Division of Fish and Wildlife)", "https://www.dem.ri.gov/programs", "https://www.dem.ri.gov/employment", "State DEM in Rhode Island protects the environment, air, water, and natural resources, including the Division of Fish and Wildlife’s management of the state’s small but diverse coastal and inland systems."],
  ["south-carolina-scdnr", "SC", "South Carolina Department of Natural Resources", "https://www.dnr.sc.gov/", "https://www.dnr.sc.gov/employment/employmentopportunities.html", "State agency for South Carolina’s land, water, and wildlife, with responsibilities for fish and shellfish, wildlife, and marine and inland conservation law enforcement in the Carolinas and Atlantic coast."],
  ["south-dakota-sdgfp", "SD", "South Dakota Game, Fish and Parks", "https://gfp.sd.gov/", "https://gfp.sd.gov/employmentopportunities/", "State agency for South Dakota’s game, fish, and parks, including the conservation and management of the state’s wildlife, fisheries, and outdoor recreation in Great Plains and river systems."],
  ["tennessee-tn-twra", "TN", "Tennessee Wildlife Resources Agency", "https://www.tn.gov/twra.html", "https://www.tn.gov/twra/apply-for-a-job/career-opportunities", "Tennessee’s agency for the conservation, management, and protection of the state’s fish, wildlife, and their habitats, including public access, public lands, and game and nongame programs."],
  ["texas-tpwd", "TX", "Texas Parks and Wildlife Department", "https://tpwd.texas.gov/", "https://tpwd.texas.gov/business/employmentopportunities/", "Texas’ lead state agency for fish and wildlife, state parks, and conservation law enforcement, with a large public trust portfolio in coastal, inland, and border landscapes."],
  ["utah-utah-dwr", "UT", "Utah Division of Wildlife Resources", "https://wildlife.utah.gov/", "https://wildlife.utah.gov/employment", "State division that conserves, protects, and manages Utah’s fish, wildlife, and their habitats, with programs for public hunting, fishing, and species recovery in the West’s dryland and high-elevation systems."],
  ["vermont-fish", "VT", "Vermont Fish and Wildlife Department", "https://vtfishandwildlife.com/", "https://vtfishandwildlife.com/career-opportunities", "Vermont state agency for the conservation, management, and protection of the state’s fish, wildlife, and their habitats, including public access, warden service, and cold-water and forest wildlife programs."],
  ["virginia-dwr", "VA", "Virginia Department of Wildlife Resources", "https://dwr.virginia.gov/", "https://dwr.virginia.gov/career-opportunities/", "Virginia’s primary agency for fish, wildlife, and their habitats, including public hunting, fishing, boating access, and field science in diverse Appalachian and mid-Atlantic ecosystems."],
  ["washington-wdfw", "WA", "Washington Department of Fish and Wildlife", "https://wdfw.wa.gov/", "https://wdfw.wa.gov/jobs", "WDFW is Washington’s state agency for fish, wildlife, and their ecosystems, with science, public lands, harvest management, and enforcement across marine, anadromous, and forested landscapes in the Pacific Northwest."],
  ["west-virginia-dnr", "WV", "West Virginia Division of Natural Resources", "https://wvdnr.gov/", "https://wvdnr.gov/employment", "WVDNR conserves, protects, and manages West Virginia’s fish, wildlife, and their habitats, including public access, public lands, and enforcement in a heavily forested Appalachian state."],
  ["wisconsin-dnr", "WI", "Wisconsin Department of Natural Resources", "https://dnr.wisconsin.gov/", "https://dnr.wisconsin.gov/employment", "Wisconsin DNR manages the state’s fish, wildlife, forests, public lands, and waters, with large programs for hunting, angling, Great Lakes, and private-land partnerships for conservation in the upper Midwest."],
  ["wyoming-wgfd", "WY", "Wyoming Game and Fish Department", "https://wgfd.wyo.gov/", "https://wgfd.wyo.gov/get-involved/employment", "Western state agency for Wyoming’s big game, fish, and nongame wildlife, and public access and habitat programs across wide-ranging, multiple-use rangeland and high-elevation systems."]
];

const dcRow = {
  id: "dc-doees",
  name: "District of Columbia Department of Energy and Environment (Fisheries and Wildlife Division)",
  st: "DC",
  url: "https://doee.dc.gov/",
  careers: "https://doee.dc.gov/service/employment",
  summary:
    "The District of Columbia’s lead local environmental and natural resource agency, including fisheries, wildlife, and water programs that manage and protect living resources in the national capital’s urban and riverine systems in coordination with partner agencies."
};

const other = [
  {
    id: "noaa-fisheries-nmfs",
    name: "NOAA National Marine Fisheries Service (NOAA Fisheries)",
    category: "fisheries_aquatic",
    summary:
      "Federal agency (within NOAA) that stewards the nation’s ocean fisheries, protected species, and marine habitats, conducts science, sets and implements management under the Magnuson-Stevens Act, and works with Councils, states, and international partners. Source: fisheries.noaa.gov.",
    url: "https://www.fisheries.noaa.gov/",
    careers_url: "https://www.fisheries.noaa.gov/about-us/careers",
    location: { country: "US", region: "greater_atlantic", state: "MD" },
    tags: ["federal", "marine", "fisheries_management", "protected_species"],
    provenance: { last_verified: v, source_type: "official_website", notes: "Headquarters in Silver Spring, MD area; also see regional offices. NOAA regions page: https://www.fisheries.noaa.gov/regions" }
  },
  {
    id: "usfws",
    name: "U.S. Fish and Wildlife Service",
    category: "wildlife_land",
    summary:
      "Federal agency within the Department of the Interior that conserves, protects, and enhances fish, wildlife, plants, and their habitats, including the National Wildlife Refuge System, ESA, and international treaty programs. Source: fws.gov.",
    url: "https://www.fws.gov/",
    careers_url: "https://www.fws.gov/careers/",
    location: { country: "US", region: "greater_atlantic", state: "DC", us_national: true },
    tags: ["federal", "refuges", "esa", "hunting_fishing_on_refuges"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "usfs",
    name: "U.S. Forest Service",
    category: "wildlife_land",
    summary:
      "Federal agency (USDA) that manages 193 million acres of national forests and grasslands, balancing timber, recreation, watersheds, and wildlife habitat, with a major role in public land stewardship and NRM. Source: fs.usda.gov.",
    url: "https://www.fs.usda.gov/",
    careers_url: "https://www.fs.usda.gov/working-with-us/jobs",
    location: { country: "US", region: "west_coast", state: "DC", us_national: true },
    tags: ["federal", "forests", "grazing", "recreation"],
    provenance: { last_verified: v, source_type: "official_website", notes: "National HQ; forest regions nationwide." }
  },
  {
    id: "blm",
    name: "Bureau of Land Management",
    category: "wildlife_land",
    summary:
      "Federal land management agency (Interior) for more public surface acres than any other U.S. agency, managing rangeland, oil and gas, minerals, recreation, and wildlife habitat in multiple use under law and NEPA. Source: blm.gov.",
    url: "https://www.blm.gov/",
    careers_url: "https://www.blm.gov/careers/",
    location: { country: "US", region: "west_coast", state: "DC", us_national: true },
    tags: ["federal", "public_lands", "rangeland", "recreation"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "nps",
    name: "National Park Service",
    category: "wildlife_land",
    summary:
      "Federal bureau (Interior) that preserves park units, cultural resources, and natural systems and provides visitor services, science, and resource stewardship in national parks and related sites. Source: nps.gov.",
    url: "https://www.nps.gov/",
    careers_url: "https://www.nps.gov/personnel",
    location: { country: "US", region: "greater_atlantic", state: "DC", us_national: true },
    tags: ["federal", "parks", "cultural_resources", "stewardship"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "tnc",
    name: "The Nature Conservancy",
    category: "conservation_ngo",
    summary:
      "Global nonprofit that protects lands and waters through science, public-private partnerships, and easements, with a major U.S. program for habitat conservation, climate, and water security for people and nature. Source: nature.org.",
    url: "https://www.nature.org/",
    careers_url: "https://www.nature.org/en-us/about-us/careers/",
    location: { country: "US", region: "greater_atlantic", state: "VA", us_national: true },
    tags: ["ngo", "land_trusts", "marine", "climate"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "audubon",
    name: "National Audubon Society",
    category: "conservation_ngo",
    summary:
      "U.S. nonprofit that uses science, policy, and community engagement to protect birds, wildlife, and the habitats on which they depend, including working lands, coasts, and climate refugia. Source: audubon.org.",
    url: "https://www.audubon.org/",
    careers_url: "https://www.audubon.org/careers",
    location: { country: "US", region: "greater_atlantic", state: "NY", us_national: true },
    tags: ["ngo", "birds", "habitat", "policy"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "defenders",
    name: "Defenders of Wildlife",
    category: "conservation_ngo",
    summary:
      "U.S. nonprofit that protects native animals and their habitats in North America through legal advocacy, on-the-ground conservation, and policy work focused on keystone, carnivore, and migratory species. Source: defenders.org.",
    url: "https://defenders.org/",
    careers_url: "https://defenders.org/careers",
    location: { country: "US", region: "greater_atlantic", state: "DC" },
    tags: ["ngo", "esa", "policy", "carnivores"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "ducks-unlimited",
    name: "Ducks Unlimited, Inc.",
    category: "wildlife_land",
    summary:
      "Non-profit conservation organization dedicated to the conservation, restoration, and management of wetlands and waterfowl habitat in North America, with science-based delivery of habitat projects. Source: ducks.org.",
    url: "https://www.ducks.org/",
    careers_url: "https://www.ducks.org/about-ducks-unlimited/employment",
    location: { country: "US", region: "southeast", state: "TN" },
    tags: ["ngo", "wetlands", "waterfowl", "private_lands"],
    provenance: { last_verified: v, source_type: "official_website", notes: "Memphis, TN; national and Canada programs (see international site for Canada career pages)." }
  },
  {
    id: "trout-unlimited",
    name: "Trout Unlimited",
    category: "fisheries_aquatic",
    summary:
      "Non-profit dedicated to the conservation, protection, and restoration of North America’s coldwater fisheries and their watersheds, through science, on-the-ground projects, and volunteer chapters. Source: tu.org.",
    url: "https://www.tu.org/",
    careers_url: "https://www.tu.org/about-tu/employment",
    location: { country: "US", region: "greater_atlantic", state: "VA" },
    tags: ["ngo", "coldwater", "salmonids", "watersheds"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "american-fisheries-society",
    name: "American Fisheries Society",
    category: "fisheries_aquatic",
    summary:
      "Professional society that advances global fisheries, aquatic resource science, and NRM through journals, standards, and meetings; supports careers and public understanding of fish resources. Source: fisheries.org.",
    url: "https://fisheries.org/",
    careers_url: "https://jobs.fisheries.org/",
    location: { country: "US", region: "greater_atlantic", state: "MD" },
    tags: ["professional_society", "science", "standards"],
    provenance: { last_verified: v, source_type: "official_website" }
  },
  {
    id: "nfwf",
    name: "National Fish and Wildlife Foundation",
    category: "conservation_ngo",
    summary:
      "Congressional chartered nonprofit (NFWF) that works with the public and private sector to protect and restore fish, wildlife, plants, and habitats in the U.S. through grantmaking and public-private delivery. Source: nfwf.org.",
    url: "https://www.nfwf.org/",
    careers_url: "https://www.nfwf.org/About-Us/Employment",
    location: { country: "US", region: "greater_atlantic", state: "DC" },
    tags: ["ngo", "grants", "partnerships", "habitat"],
    provenance: { last_verified: v, source_type: "official_website" }
  }
];

function stateEntry(row) {
  const [id, st, name, url, careers, summary] = row;
  return {
    id,
    name,
    category: "state_agency",
    summary,
    url,
    careers_url: careers,
    location: { country: "US", region: NOAA[st], state: st },
    tags: ["state_agency", "fish_and_wildlife"],
    provenance: {
      last_verified: v,
      source_type: "official_website",
      notes: "State natural resource or fish and wildlife lead agency. Cross-check: Association of Fish & Wildlife Agencies state directory https://www.fishwildlife.org/ ; some careers route through state civil service portals."
    }
  };
}

const dcEntry = {
  id: dcRow.id,
  name: dcRow.name,
  category: "state_agency",
  summary: dcRow.summary,
  url: dcRow.url,
  careers_url: dcRow.careers,
  location: { country: "US", region: "greater_atlantic", state: "DC" },
  tags: ["state_agency", "municipal", "fish_and_wildlife"],
  provenance: { last_verified: v, source_type: "official_website" }
};

const all = [...other, ...stateAgencyRows.map(stateEntry), dcEntry];
fs.writeFileSync(out, JSON.stringify(all, null, 2) + "\n", "utf8");
console.log("Wrote", all.length, "entries to", out);
