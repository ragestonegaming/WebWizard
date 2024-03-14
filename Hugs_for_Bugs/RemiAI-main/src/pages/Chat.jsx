import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import DownloadButton from '../components/DownloadButton';
import AppInput from '../components/Input';
import { chat, predict } from '../API';
import Loader from '../components/Loader';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const symptoms = [
    {"label": "Itching", "value": "itching"},
    {"label": "Skin Rash", "value": "skin_rash"},
    {"label": "Nodal Skin Eruptions", "value": "nodal_skin_eruptions"},
    {"label": "Continuous Sneezing", "value": "continuous_sneezing"},
    {"label": "Shivering", "value": "shivering"},
    {"label": "Chills", "value": "chills"},
    {"label": "Joint Pain", "value": "joint_pain"},
    {"label": "Stomach Pain", "value": "stomach_pain"},
    {"label": "Acidity", "value": "acidity"},
    {"label": "Ulcers on Tongue", "value": "ulcers_on_tongue"},
    {"label": "Muscle Wasting", "value": "muscle_wasting"},
    {"label": "Vomiting", "value": "vomiting"},
    {"label": "Burning Micturition", "value": "burning_micturition"},
    {"label": "Spotting Urination", "value": "spotting_urination"},
    {"label": "Fatigue", "value": "fatigue"},
    {"label": "Weight Gain", "value": "weight_gain"},
    {"label": "Anxiety", "value": "anxiety"},
    {"label": "Cold Hands and Feets", "value": "cold_hands_and_feets"},
    {"label": "Mood Swings", "value": "mood_swings"},
    {"label": "Weight Loss", "value": "weight_loss"},
    {"label": "Restlessness", "value": "restlessness"},
    {"label": "Lethargy", "value": "lethargy"},
    {"label": "Patches in Throat", "value": "patches_in_throat"},
    {"label": "Irregular Sugar Level", "value": "irregular_sugar_level"},
    {"label": "Cough", "value": "cough"},
    {"label": "High Fever", "value": "high_fever"},
    {"label": "Sunken Eyes", "value": "sunken_eyes"},
    {"label": "Breathlessness", "value": "breathlessness"},
    {"label": "Sweating", "value": "sweating"},
    {"label": "Dehydration", "value": "dehydration"},
    {"label": "Indigestion", "value": "indigestion"},
    {"label": "Headache", "value": "headache"},
    {"label": "Yellowish Skin", "value": "yellowish_skin"},
    {"label": "Dark Urine", "value": "dark_urine"},
    {"label": "Nausea", "value": "nausea"},
    {"label": "Loss of Appetite", "value": "loss_of_appetite"},
    {"label": "Pain Behind the Eyes", "value": "pain_behind_the_eyes"},
    {"label": "Back Pain", "value": "back_pain"},
    {"label": "Constipation", "value": "constipation"},
    {"label": "Abdominal Pain", "value": "abdominal_pain"},
    {"label": "Diarrhoea", "value": "diarrhoea"},
    {"label": "Mild Fever", "value": "mild_fever"},
    {"label": "Yellow Urine", "value": "yellow_urine"},
    {"label": "Yellowing of Eyes", "value": "yellowing_of_eyes"},
    {"label": "Acute Liver Failure", "value": "acute_liver_failure"},
    {"label": "Fluid Overload", "value": "fluid_overload"},
    {"label": "Swelling of Stomach", "value": "swelling_of_stomach"},
    {"label": "Swelled Lymph Nodes", "value": "swelled_lymph_nodes"},
    {"label": "Malaise", "value": "malaise"},
    {"label": "Blurred and Distorted Vision", "value": "blurred_and_distorted_vision"},
    {"label": "Phlegm", "value": "phlegm"},
    {"label": "Throat Irritation", "value": "throat_irritation"},
    {"label": "Redness of Eyes", "value": "redness_of_eyes"},
    {"label": "Sinus Pressure", "value": "sinus_pressure"},
    {"label": "Runny Nose", "value": "runny_nose"},
    {"label": "Congestion", "value": "congestion"},
    {"label": "Chest Pain", "value": "chest_pain"},
    {"label": "Weakness in Limbs", "value": "weakness_in_limbs"},
    {"label": "Fast Heart Rate", "value": "fast_heart_rate"},
    {"label": "Pain During Bowel Movements", "value": "pain_during_bowel_movements"},
    {"label": "Pain in Anal Region", "value": "pain_in_anal_region"},
    {"label": "Bloody Stool", "value": "bloody_stool"},
    {"label": "Irritation in Anus", "value": "irritation_in_anus"},
    {"label": "Neck Pain", "value": "neck_pain"},
    {"label": "Dizziness", "value": "dizziness"},
    {"label": "Cramps", "value": "cramps"},
    {"label": "Bruising", "value": "bruising"},
    {"label": "Obesity", "value": "obesity"},
    {"label": "Swollen Legs", "value": "swollen_legs"},
    {"label": "Swollen Blood Vessels", "value": "swollen_blood_vessels"},
    {"label": "Puffy Face and Eyes", "value": "puffy_face_and_eyes"},
    {"label": "Enlarged Thyroid", "value": "enlarged_thyroid"},
    {"label": "Brittle Nails", "value": "brittle_nails"},
    {"label": "Swollen Extremities", "value": "swollen_extremities"},
    {"label": "Excessive Hunger", "value": "excessive_hunger"},
    {"label": "Extra Marital Contacts", "value": "extra_marital_contacts"},
    {"label": "Drying and Tingling Lips", "value": "drying_and_tingling_lips"},
    {"label": "Slurred Speech", "value": "slurred_speech"},
    {"label": "Knee Pain", "value": "knee_pain"},
    {"label": "Hip Joint Pain", "value": "hip_joint_pain"},
    {"label": "Muscle Weakness", "value": "muscle_weakness"},
    {"label": "Stiff Neck", "value": "stiff_neck"},
    {"label": "Swelling Joints", "value": "swelling_joints"},
    {"label": "Movement Stiffness", "value": "movement_stiffness"},
    {"label": "Spinning Movements", "value": "spinning_movements"},
    {"label": "Loss of Balance", "value": "loss_of_balance"},
    {"label": "Unsteadiness", "value": "unsteadiness"},
    {"label": "Weakness of One Body Side", "value": "weakness_of_one_body_side"},
    {"label": "Loss of Smell", "value": "loss_of_smell"},
    {"label": "Bladder Discomfort", "value": "bladder_discomfort"},
    {"label": "Foul Smell of Urine", "value": "foul_smell_of_urine"},
    {"label": "Continuous Feel of Urine", "value": "continuous_feel_of_urine"},
    {"label": "Passage of Gases", "value": "passage_of_gases"},
    {"label": "Internal Itching", "value": "internal_itching"},
    {"label": "Toxic Look Typhos", "value": "toxic_look_typhos"},
    {"label": "Depression", "value": "depression"},
    {"label": "Irritability", "value": "irritability"},
    {"label": "Muscle Pain", "value": "muscle_pain"},
    {"label": "Altered Sensorium", "value": "altered_sensorium"},
    {"label": "Red Spots Over Body", "value": "red_spots_over_body"},
    {"label": "Belly Pain", "value": "belly_pain"},
    {"label": "Abnormal Menstruation", "value": "abnormal_menstruation"},
    {"label": "Dischromic Patches", "value": "dischromic_patches"},
    {"label": "Watering From Eyes", "value": "watering_from_eyes"},
    {"label": "Increased Appetite", "value": "increased_appetite"},
    {"label": "Polyuria", "value": "polyuria"},
    {"label": "Family History", "value": "family_history"},
    {"label": "Mucoid Sputum", "value": "mucoid_sputum"},
    {"label": "Rusty Sputum", "value": "rusty_sputum"},
    {"label": "Lack of Concentration", "value": "lack_of_concentration"},
    {"label": "Visual Disturbances", "value": "visual_disturbances"},
    {"label": "Receiving Blood Transfusion", "value": "receiving_blood_transfusion"},
    {"label": "Receiving Unsterile Injections", "value": "receiving_unsterile_injections"},
    {"label": "Coma", "value": "coma"},
    {"label": "Stomach Bleeding", "value": "stomach_bleeding"},
    {"label": "Distention of Abdomen", "value": "distention_of_abdomen"},
    {"label": "History of Alcohol Consumption", "value": "history_of_alcohol_consumption"},
    {"label": "Fluid Overload 2", "value": "fluid_overload_2"},
    {"label": "Blood in Sputum", "value": "blood_in_sputum"},
    {"label": "Prominent Veins on Calf", "value": "prominent_veins_on_calf"},
    {"label": "Palpitations", "value": "palpitations"},
    {"label": "Painful Walking", "value": "painful_walking"},
    {"label": "Pus Filled Pimples", "value": "pus_filled_pimples"},
    {"label": "Blackheads", "value": "blackheads"},
    {"label": "Scurring", "value": "scurring"},
    {"label": "Skin Peeling", "value": "skin_peeling"},
    {"label": "Silver Like Dusting", "value": "silver_like_dusting"},
    {"label": "Small Dents in Nails", "value": "small_dents_in_nails"},
    {"label": "Inflammatory Nails", "value": "inflammatory_nails"},
    {"label": "Blister", "value": "blister"},
    {"label": "Red Sore Around Nose", "value": "red_sore_around_nose"},
    {"label": "Yellow Crust Ooze", "value": "yellow_crust_ooze"},
    {"label": "Prognosis", "value": "prognosis"}
  ]


  

const CheckUp = () => {
    const [selected, setSelected] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [res, setRes] = useState({});
    const [loading, setLoading] = useState(false)
    const [textMessage, setTextMessage] = useState("")
    const [messages, setMessages] = useState(
        JSON.parse(localStorage.getItem('messages')) || []
    )

    const getMessages = () => {
        const chat = localStorage.getItem("messages");
        setMessages(JSON.parse(chat));
        // console.log(messages);
      };
    
    useEffect(() => {
        getMessages();
    },[]);

    const filteredSymptoms = symptoms.filter((symp) =>
    symp.label.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const selectedSymptoms = filteredSymptoms.filter((symp) =>
    selected.includes(symp.value)
  );
  const remainingSymptoms = filteredSymptoms.filter(
    (symp) => !selected.includes(symp.value)
  );

  const onSelect = (value) => {
    const isSelected = selected.includes(value);

    let updatedData;

    if (isSelected) {

      updatedData = selected.filter((item) => item !== value);
    } else {
  
      updatedData = [...selected, value];
    }

    setSelected(updatedData);
    console.log(selected);
  };

  const onUnSelect = (index) => {
    let data = selectedSymptoms
    setSelectedS(data.splice(index, 1))
   
  }

  const predictResult = async () => {
      setLoading(true);
    try {
        let res = await predict({"symptoms": selected})
        setRes(res);
        let updatedThreads = JSON.parse(localStorage.getItem("threads")) || [];
        updatedThreads.push(res);
        localStorage.setItem("threads", JSON.stringify(updatedThreads));
        
    } catch (error) {
        console.log(error)
    }

    setLoading(false);
  }

  return (
    <section className=" bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black min-h-screen">
      <NavBar />
    <div className="flex justify-evenly mt-4">
        <div className="w-1/3 h-[87vh] bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 shadow-md rounded-xl overflow-hidden">
       <div className="p-8 ">

        <input
              type="text"
              placeholder="Search symptoms..."
              className="w-full px-4 py-3 mb-4 rounded-md bg-[#0e131f] border border-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
            <div className="flex gap-4 justify-start flex-wrap p-8 overflow-y-scroll max-h-full noscroll">

      
              {selectedSymptoms?.map((symp, i) => (
                <button
                  key={i}
              
                  className="rounded-full px-4 py-2 bg-blue-500 text-white bg-gradient-to-tr from-[#c64356] to-[#000] font-semibold"
                >
                  {symp.label}
                  <button className='border rounded-full ml-2 w-8 h-8 text-red-600 border-red-600 font-bold' onClick={() => onSelect(symp.value)}>X</button>
                </button>
              ))}
              {/* Display remaining symptoms */}
              {remainingSymptoms?.map((symp, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(symp.value)}
                  className={`rounded-full px-4 py-2 font-semibold text-white ${
                    selected.includes(symp.value)
                      ? 'bg-blue-500 text-white' // Selected color
                      : 'bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 shadow-md'
                  }`}
                >
                  {symp.label}
                </button>
              ))}
            </div>
        </div>
        <button className='cursor-default'> <button onClick={predictResult} className='bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 shadow-md rounded-md p-4'>
            {loading? <Loader/> :"Predict & Consult AI Doctor"}
            </button>
            </button>
        <div className="w-1/3 h-[87vh] relative bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5 shadow-md rounded-xl overflow-hidden">
                {res?.disease && res?.aiResult && 
                <div className='p-8 max-h-full  overflow-y-scroll noscroll'>
                 <div className="text-xl font-semibold mb-6">Disease: {`${res?.disease}`}</div>
                  <div className="text-md">
                  <Markdown remarkPlugins={[remarkGfm]}>{res?.aiResult}</Markdown>
                     </div>
                </div>
                }
                {/* <AppInput /> */}
        </div>
    </div>
    </section>
  );
};



export default CheckUp;
